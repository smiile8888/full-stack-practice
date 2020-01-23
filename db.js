const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to db!');
});

/**
 * Create tables
 */

 const createTable = () => {
     const queryText = `CREATE TABLE IF NOT EXISTS
                        customers(
                            ID SERIAL PRIMARY KEY,
                            created_at TIMESTAMP,
                            first_name VARCHAR(30),
                            last_name VARCHAR(30),
                            email VARCHAR(30),
                            logitude TEXT,
                            latitude TEXT,
                            ip TEXT
                        )`;
    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });
 }

 module.exports = {
     createTable
 };

 require('make-runnable');