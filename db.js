const { Pool } = require('pg');
const mysql = require('mysql');
const dotenv = require('dotenv');

// Using dotenv.config() to search for .env file
dotenv.config();

const pool = new Pool({
    // Using the credential specified in .env file
    connectionString: process.env.DATABASE_URL
});

pool.connect((err) => {
    if (err) throw (err);
    console.log("Connected to DB...")
});

const dbMethod = {
    /**
     * Sending query to DB
     * @param {String} queryText    DB query
     * @param {String} param        (optional) additional parameters when do the query
     * @returns {Promise}
     */
    async query(queryText, param) {
        return new Promise((resolve, reject) => {
            pool.query(queryText, param)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
        });
    },

    /**
     * Create customers table
     */
    async createCustomersTable() {
        const queryText = `CREATE TABLE IF NOT EXISTS 
                            customers (
                                id serial NOT NULL PRIMARY KEY,
                                email varchar(255) NOT NULL DEFAULT '' UNIQUE,
                                first_name varchar(30) DEFAULT NULL,
                                last_name varchar(50) DEFAULT NULL,
                                ip varchar(15) DEFAULT NULL,
                                latitude decimal(10, 6) DEFAULT NULL,
                                longitude decimal(10, 6) DEFAULT NULL,
                                created_at timestamp NOT NULL
                            )`;
        return new Promise((resolve, reject) => {
            pool.query(queryText)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    throw err;
                    // reject(err);
                });
        });
    },

    /**
     * Drop customers table
     */
    async dropCustomersTable() {
        const queryText = `DROP TABLE IF EXISTS customers`;
        return new Promise((resolve, reject) => {
            pool.query(queryText)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    throw err;
                    // reject(err);
                });
        });
    }
}

module.exports = dbMethod;
