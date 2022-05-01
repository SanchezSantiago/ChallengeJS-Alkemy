const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
//Connection
const pool = require('../database/database');
router.post('/users/login', async (req, res) => { //Login
    const {
        email,
        password
    } = req.body;
    pool.query('SELECT * FROM user WHERE email = ?', [email], async (err, result) => {
        if (err) {
            res.send({
                err: err
            })
        }
        if (result.length > 0) { //If results don't have nothing, the user doesn't exist
            bcrypt.compare(password, result[0].password, (error, response) => { //Compare passwords
                if (response) {
                    const id = result[0].id;
                    const token = jwt.sign({id}, process.env.SECRET, {
                        expiresIn: 900,
                    })
                    res.json({
                        auth: true,
                        token: token,
                        message: `Welcome, ${result[0].username}!`
                    });
                } else {
                    res.status(209)
                    res.send("Wrong email/password combination!")
                }
            })
        } else {
            res.status(209)
            res.send("User doesn't exist!");
        }
    })

});

router.post('/users/register', async (req, res) => { //Register
    const {
        username,
        password,
        email
    } = req.body;
    const newUser = {
        username,
        password: await bcrypt.hash(password, 10),
        email
    };
    await pool.query('INSERT INTO user set ?', [newUser], (err, result) => {
        if (err) {
            res.status(209);
            err.sqlMessage.includes('username') ? //If sqlMessage includes 'username' means the user is duplicate, otherwise is the email
                res.send('username already taken!') : res.send('the email already exist!')
        } else {
            res.send(result);
        }
    });
});






module.exports = router;