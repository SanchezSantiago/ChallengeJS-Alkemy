const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
//Connection
const pool = require('../database/database');

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = {
        username,
        password
    }
    console.log(user);
    res.send()
})




module.exports = router;