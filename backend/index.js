const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const jwt = require('express-jwt');
const operationsRoutes = require('./routes/operationsRoutes');
const usersRoutes = require('./routes/usersRoutes');

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

//Routes
app.all('/api/*', jwt({secret: process.env.SECRET, algorithms: ['HS256']}).unless({path: ['/api/users/login', '/api/users/register']}));
app.use('/api', operationsRoutes, usersRoutes); 

//Connection
app.listen(process.env.PORT);