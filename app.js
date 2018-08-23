const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { DB_URL } = process.env.DB_URL ? process.env : require('./config/config.js')
const apiRouter = require('./routes/api.js')
const home = require('./homepage.json')
console.log(process.env,'<<<<<<< pre')
console.log(DB_URL,'<<<<< DB_URL')


mongoose.connect(DB_URL, {useNewUrlParser: true}
)
.then(()=> {
    console.log(`Connected to ${DB_URL}...`) 
})
app.use(bodyParser.json())
// app.use('/', (req, res, next) => {
//     res.status(200).send(home)
// })    
app.use('/api', apiRouter)

app.use('/*', (req, res, next) => {
    next({status: 404, msg: 'Page not found'})
})

app.use((err, req, res, next) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
        err.status = 400
        if (!err.msg) err.msg = 'Bad Request'     
    } 
    next(err)
})

app.use((err, req, res, next) => {
    if (err.status !== 404 && err.status !== 400) {
        err.status = 500
        err.msg = 'Something has gone horribly wrong'
    }
    res.status(err.status).send({msg: err.msg})
})




module.exports = app