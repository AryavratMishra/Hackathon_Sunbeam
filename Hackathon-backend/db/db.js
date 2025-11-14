const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'D1_92557_SIDDHARTH',
    password: 'manager',
    database: 'movies_reviews'
})

module.exports = pool