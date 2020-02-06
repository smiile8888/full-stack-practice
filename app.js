// const mysql = require('mysql');
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

// Create customers table
db.createCustomersTable();

// Route setting
// app.use('/api/customers', customers);

app.get('/', (req, res) => {
    return res.status(200).send({'message': 'Welcome to RESTful APIs service!'});
});

module.exports = app;