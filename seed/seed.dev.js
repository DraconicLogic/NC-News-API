const seedDB = require('./seed')
const mongoose = require('mongoose')
const DB_URL = require('../config.js')

const testTopics = require('./testData/topics.json')
const testArticles = require('./testData/articles.json')
const testUsers = require('./testData/users.json')
const testComments = require('./testData/comments.json')

const testData = {testTopics, testArticles, testUsers, testComments}


mongoose.connect(DB_URL, {useNewUrlParser: true}
)
.then(()=> {
    console.log(`Connected to ${DB_URL}...`) 
    return seedDB(testData)
})
.then(() => {
    mongoose.disconnect()
})
.catch(console.error)