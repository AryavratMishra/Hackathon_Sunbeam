const express = require('express')
const cors = require('cors')

//user defined modules
const authorization = require('./routes/authorization')
const moviesRouter = require('./routes/movies')
const reviewRouter = require('./routes/review')
const userRouter = require('./routes/user')
const shareRouter = require('./routes/share')

//creating the express object
const app = express()

//add the middlewares
app.use(cors())
app.use(express.json())
app.use(authorization)


app.use('/movies', moviesRouter)
app.use('/review', reviewRouter)
app.use('/user', userRouter)
app.use('/share', shareRouter)

//startig the server at port 4000
app.listen(4000, 'localhost', () => {
    console.log('server started at port 4000')
})