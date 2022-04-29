const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
//Connection
const pool = require('../database/database');
router.post('/users/login', async(req, res) =>{ //Login
    const {username, password} = req.body;
    pool.query('SELECT * FROM user WHERE username = ?', [username], async(err, result) => {
        if(err){
            res.send({err: err})
        }
        if(result.length > 0 ){
            bcrypt.compare(password, result[0].password, (error, response)=> {
                const id = result[0].id;
                const token = jwt.sign({id}, "jwtsecret", {
                    expiresIn: 900,
                })

                res.json({auth: true, token: token, result: result});
            }) 
        } else {
            res.send("User doesn't exist!");
        }
    })

});

router.post('/users/register', async(req, res) => { //Register
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
});






module.exports = router;