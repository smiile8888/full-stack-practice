const fs = require('fs');
const csvParser = require('csv-parser');
const { Pool } = require('pg');
const db = require('./db');

const pool = new Pool({
    // Using the credential specified in .env file
    connectionString: process.env.DATABASE_URL
});

pool.connect().then(console.log("Connected to DB..."));

const createCustomersTable = () => {
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
}

/**
 * Read .csv file
 * @param {String} dataPath     Path of file
 * @returns {List} data         List containing a row as an object
 */
const getData = (dataPath) => {
    let data = [];
    return new Promise((resolve, reject) => {
        let streamer = fs.createReadStream(dataPath);
        streamer
            .pipe(csvParser())
            .on("data", row => data.push(row))
            .on("end", () => {
                resolve(data);
            });
    });
}

/**
 * Map header of data.csv with map.csv
 * The attributes on table customer will be created based on the field in map files
 * @param   {Object} mapper     Object of header mapper containing the header used in DB table as key and the header shown in data.csv as value
 * @returns {Object} obj        Object where key is the header shown in data.csv and value is the header used as the coulm in DB table
 */
const mapHeader = (mapper) => {
    return new Promise((resolve, reject) => {
        try {
            let obj = {};
            Object.entries(mapper).map(([key, value]) => {obj[value] = key});
            resolve(obj);
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Insert data to DB
 * @param {Object} data     Object containing the values 
 */
const loadDataToDB = (data) => {
    let value = `'${data.created_at}', '${data.first_name}', '${data.last_name}', '${data.email}', '${data.latitude}', '${data.longitude}', '${data.ip}'`;
    let query = `INSERT INTO customers (created_at, first_name, last_name, email, latitude, logitude, ip) VALUES (${value})`;
    console.log(query);
    return new Promise((resolve, reject) => {
        pool.query(query)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
}

/**
 * Main function of etl
 * 1. Check table on database, if not exist, create one
 * 2. Read file
 * 3. Map csv header to column in DB table
 * 4. Insert record to database
 */

async function startETL() {
    // await db.createCustomersTable().then("Table customers created...");

    /** Here is for map1.csv and data1.csv */
    let header = await getData("./etl/map1.csv");
    let headerMap = await mapHeader(header[0]);
    // console.log(headerMap);

    let data = await getData("./etl/data1.csv");
    data.map((record) => {
        // console.log("Inserting data");
        let temp = {};
        Object.keys(record).forEach(key => {
            temp[headerMap[key]] = record[key];
        })
        // console.log(temp);
        loadDataToDB(temp);
    });

    /** Here is for map2.csv and data2.csv */
}

startETL();