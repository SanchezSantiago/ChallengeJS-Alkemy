const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//Connection
const pool = require('../database/database');

router.post('/users/register', async(req, res) => {
    const {username, password, email} = req.body;
    const newUser = {
        username,
        password: await bcrypt.hash(password, 10),
        email
    };
    await pool.query('INSERT INTO user set ?', [newUser],(err, result) => {
        if(err){
            res.status(209);
            err.sqlMessage.includes('username')?
                res.send('username already taken!') : res.send('the email already exist!')
        } else{
            res.send(result);
            console.log(newUser);
        }
    });
})






module.exports = router;