const mongoose = require('mongoose')
const {formatCommentData, formatArticleData} = require('../utils.js')
const {User, Article, Comment, Topic} = require('../models/index.js')

const seedDB = ({testTopics, testArticles, testUsers, testComments}) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
        const topicData = Topic.insertMany(testTopics)
        const userData = User.insertMany(testUsers)
        return Promise.all([topicData, userData])
        
    })
    .then(([topicDocs, userDocs]) => {


        const articleData = Article.insertMany(formatArticleData(testArticles, userDocs))
       return Promise.all([articleData, topicDocs, userDocs])
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
        const commentData = Comment.insertMany(formatCommentData(testComments, userDocs, articleDocs))
        return Promise.all[commentData, articleDocs, topicDocs, userDocs]
    })
}

module.exports = seedDB 
