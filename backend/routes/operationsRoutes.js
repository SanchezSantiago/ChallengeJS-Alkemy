const express = require('express');
const router = express.Router();
//Connection
const pool = require('../database/database');

router.get('/operations', async(req, res) => {//Get all operations
    await pool.query("SELECT * FROM operation ORDER BY id DESC LIMIT 10", (err, result) => {
        res.send(result);
    });
});

router.post('/operations', async(req, res) => { //Insert operations in database
    const {concept, amount, date, type} = req.body;
    const user_id = 45;
    const category = 'test';
    const newOperation = {
        concept,
        amount,
        type,
        category,
        date,
        user_id

    };
    await pool.query('INSERT INTO operation set ?', [newOperation],(err, result) => {
        res.send(result);
        console.log(newOperation);
    });
});
router.put('/operations/:id', async(req,res) =>{ //Update operation
    const {concept, amount, date} = req.body;
    const {id} = req.params;
    const user_id = 45;
    const category = 'test';
    const newOperation = {
        concept,
        amount,
        category,
        date: date.slice(0, 10),//This will put date in the correct format, without UTC
        user_id
    };

    await pool.query('UPDATE operation SET ? WHERE id = ?', [newOperation, id], (err, result) => {
        res.send(result);
    });
});


router.delete('/operations/:id', async(req, res) =>{ //Delete operation
    const {id} = req.params;
    await pool.query('DELETE FROM operation WHERE id = ?', [id], (err, result) => {
        res.send(result)
    })
})

router.get('/operations/getOperationByType/:type', async(req, res) => { //Get income type operations
    const {type} = req.params;
    await pool.query("SELECT * FROM operation WHERE type = ? ORDER BY id DESC",[type], (err, result) => {
        res.send(result);
    });
});

router.get('/operations/getBudget', async(req, res) => {
    await pool.query('SELECT SUM(amount) as budget FROM operation', (err, result) =>{
        res.send(result)
    });
})


module.exports = router;
