const seedDB = require('./seed.js')
const mongoose = require('mongoose')
const { DB_URL}  = require('../config/config.js')
const data = require('./devData/devData.js')

mongoose.connect(DB_URL, {useNewUrlParser: true}
)
.then(()=> {
    console.log(`Connected to ${DB_URL}...`) 
    return seedDB(data)
})
.then(() => {
    mongoose.disconnect()
})
.catch(console.error)