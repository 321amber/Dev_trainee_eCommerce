const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
})

module.exports = {
    query: (text,params)=> pool.query(text,params)
};