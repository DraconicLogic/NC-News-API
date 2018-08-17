const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { DB_URL } = process.env.DB_URL || require('./config/config.js')
const apiRouter = require('./routes/api.js')
console.log(DB_URL,'CHECK THIS')
mongoose.connect(DB_URL, {useNewUrlParser: true}
)
.then(()=> {
    console.log(`Connected to ${DB_URL}...`) 
})
app.use(bodyParser.json())    
app.use('/api', apiRouter)

app.use('/*', (req, res, next) => {
    next({status: 404, msg: 'Page not found'})
})

app.use((err, req, res, next) => {
   
})




module.exports = app