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
        date,
        user_id
    };
    console.log(newOperation)
    console.log(id);
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

router.get('/operations/incomes', async(req, res) => { //Get income type operations
    await pool.query("SELECT * FROM operation WHERE type = 'Income' ORDER BY id DESC", (err, result) => {
        res.send(result);
    });
});

router.get('/operations/expenses', async(req, res) => { //Get expenses type operations
    await pool.query("SELECT * FROM operation WHERE type = 'Expense' ORDER BY id DESC", (err, result) => {
        res.send(result);
    });
});


module.exports = router;
