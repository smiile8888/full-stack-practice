const mysql = require('mysql');
const express = require('express');
const customers = require('./api/customers');

const app = express();
const router = express.Router();

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
    return res.send('Welcome to RESTful APIs service!');
});