const express = require('express');
const router = express.Router();
//Connection
const pool = require('../database/database');

router.get('/operations/getoperations', async(req, res) => {//Get all operations
    const userId = req.user.id;
    await pool.query("SELECT * FROM operation WHERE user_id = ? ORDER BY id DESC LIMIT 10",[userId], (err, result) => {
        res.send(result);
    });
});

router.post('/operations/postoperation', async(req, res) => { //Insert operations in database
    const {concept, amount, date, type} = req.body;
    const user_id = req.user.id;
    const newOperation = {
        concept,
        amount,
        type,
        date,
        user_id

    };
    await pool.query('INSERT INTO operation set ?', [newOperation],(err, result) => {
        res.send(result);
    });
});
router.put('/operations/update/:id', async(req,res) =>{ //Update operation
    const {concept, amount, date} = req.body;
    const {id} = req.params;
    const user_id = req.user.id;
    const newOperation = {
        concept,
        amount,
        date: date.slice(0, 10),//This will put date in the correct format, without UTC
        user_id
    };

    await pool.query('UPDATE operation SET ? WHERE id = ?', [newOperation, id], (err, result) => {
        res.send(result);
    });
});


router.delete('/operations/delete/:id', async(req, res) =>{ //Delete operation
    const user_id = req.user.id;
    const operationId = req.params.id;
    await pool.query('DELETE FROM operation WHERE user_id = ? AND id = ?', [user_id, operationId], (err, result) => {
        res.send(result);
    })
})

router.get('/operations/getoperationbytype/:type', async(req, res) => { //Get operations by type
    const user_id = req.user.id
    const {type} = req.params;
    await pool.query("SELECT * FROM operation WHERE user_id = ? AND type = ? ORDER BY id desc",[user_id, type], (err, result) => {
        res.send(result);
    });
});

router.get('/operations/getbudget', async(req, res) => { //get the total budget
    const user_id = req.user.id;
    await pool.query('SELECT SUM(amount) as budget FROM operation WHERE user_id = ?',[user_id], (err, result) =>{
        res.send(result)
    });
})


module.exports = router;
