const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const cryptoJs = require("crypto-js");
const router = express.Router()

router.get('/', (req, res) => {
    const sql = `SELECT movie_id, review, rating FROM reviews WHERE  user_id=?`
    pool.query(sql, [ req.headers.userId ],(error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.get('/all', (req, res) => {
    const sql = `SELECT movie_id, review, rating FROM reviews`
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/insert', (req, res) => {
    const {movie_id, review, rating} = req.body
    const sql = `INSERT INTO reviews (movie_id, review, rating, user_id ) VALUES (?,?,?,?)`
    pool.query(
        sql, [ movie_id, review, rating, req.headers.userId ],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.put('/update/:id', (req, res) => {
    const { review, rating} = req.body
    const sql = `UPDATE reviews SET review=?, rating=? WHERE id = ? AND user_id=?`
    pool.query(
        sql, [ review, rating, req.params.id, req.headers.userId ],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    const sql = `DELETE FROM reviews  WHERE id = ? AND user_id=?`
    pool.query(
        sql, [ req.params.id, req.headers.userId ],
        (error, data) => {
            res.send(result.createResult(error, data))
        }
    )
})

module.exports = router