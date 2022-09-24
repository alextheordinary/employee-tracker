const mysql = require('mysql2');

// Creating a mySQL connection using environment variables stored in .env - requires dotenv node module
const db = mysql.createConnection(
    {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    },
    console.log('Connected to db')
);

module.exports = db;