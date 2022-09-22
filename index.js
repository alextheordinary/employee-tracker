require('dotenv').config(); // used to store db credentials in a local .env file that won't be pushed to the repo
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
