const { Pool } = require('pg');
const dotenv = require('dotenv');

// Using dotenv.config() to search for .env file
dotenv.config();

const pool = new Pool({
    // Using the credential specified in .env file
    connectionString: process.env.DATABASE_URL
});

pool.connect();

const dbMethod = {
    /**
     * DB query
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     */
    async query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
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
        return new Promise((resolve, reject) => {
            pool.query(queryText)
            .then((res) => {
                resolve(res);
                pool.end();
            })
            .catch((err) => {
                reject(err);
                pool.end();
            });
        })
    },

    /**
     * Drop customers table
     */
    async dropCustomersTable() {
        const queryText = `DROP TABLE IF EXISTS customers`;
        pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        })
    }
}

module.exports = dbMethod;
