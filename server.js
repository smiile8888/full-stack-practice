// const fs = require('fs');
// const mysql = require('mysql');
// const fastcsv = require('fast-csv');
const express = require('express');
const server = express();
const router = express.Router();

// API Routes
const app = require('./app');
const db = require('./db');

const port = 3000;

server.use('/api', app);

server.set('port', process.env.port || port);
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});