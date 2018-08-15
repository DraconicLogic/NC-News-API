const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api', apiRouter)

app.use('/*', (req, res) => {
    res.status(404).send('Page not found')
})

module.exports = app