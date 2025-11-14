
const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const cryptoJs = require("crypto-js");
const router = express.Router()

router.get('/', (req, res) => {
    const sql = `SELECT  review_id FROM shares WHERE  user_id=?`
    pool.query(sql, [ req.headers.userId ],(error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/:id', (req, res) => {
    const {user_id} = req.body
    const sql = `INSERT INTO shares (review_id, user_id ) VALUES (?,?)`
    pool.query(
        sql, [ req.params.id, user_id ],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})



module.exports = router
