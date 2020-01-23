const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const customers = require('./api/customers');

const app = express();
const router = express.Router();

const db = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// // Creat connection to database
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'systemDB'
// });

// // Connect to database
// db.connect((err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log('Connect to database successfully!');
//     }
// });

// global.db = db;

// Route setting
// app.use('/api/customers', customers);

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'Welcome to RESTful APIs service!'});
});

module.exports = app;