const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()

router.post('/',(req, res) => {
    const {
        title,
        releaseDate,
    } = req.body

    console.log(req.body)

    const sql = `
    INSERT INTO movies (title,releasedate) VALUES (?,?)`

    pool.query(
        sql,
        [
            title,
            releaseDate,
        ],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.get('/', (req, res) => {
    const sql = `SELECT id,title,releaseDate FROM movies`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})
module.exports = router