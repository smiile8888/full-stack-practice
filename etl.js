const fs = require('fs');
const csvParser = require('csv-parser');
const db = require('./db');

// 1. Read file
// 2. Push data into stream
// 3. Check table on database, if not, create one
// 4. Insert record to database

/**
 * Read .csv file
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
 * 
 */
const mapHeader = (mapper, obj) => {
    return new Promise((resolve, reject) => {
        resolve(obj);
    })
}

const loadDataToDB = (data) => {
    let value = `'${data.created_at}', '${data.first_name}', '${data.last_name}', '${data.email}', '${data.latitude}', '${data.longitude}', '${data.ip}'`;
    let query = `INSERT INTO customers (created_at, first_name, last_name, email, latitude, logitude, ip) VALUES (${value})`;
    return new Promise((resolve, reject) => {
        resolve(db.query(query));
    });
}

async function startETL() {
    let header = await getData("./etl/map1.csv");
    
    console.log(header);
    console.log(Object.entries(header[0]));
    let tryMap = Object.entries(header[0]).map(([key, value]) => [value, key]);
    console.log(tryMap);
    // console.log(header);
    // header = Object.entries(header).map(([key, value]) => [value, key]);
    // console.log(header);
}

startETL();