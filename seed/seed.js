const mongoose = require('mongoose')
const {formatCommentData, formatArticleData} = require('../utils.js')
const {User, Article, Comment, Topic} = require('../models/index.js')

const seedDB = ({topics, articles, users, comments}) => {

    return mongoose.connection.dropDatabase()
    .then(() => {
      
        const topicData = Topic.insertMany(topics)
        const userData = User.insertMany(users)

        return Promise.all([topicData, userData])
        
    })
    .then(([topicDocs, userDocs]) => {

        const articleData = Article.insertMany(formatArticleData(articles, userDocs))
    
       return Promise.all([articleData, topicDocs, userDocs])
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
        
        // const commentData = ;
        // console.log(commentData.length,'<<< comments')
        formatCommentData(comments, userDocs, articleDocs)
        return Promise.all([Comment.insertMany(formatCommentData(comments, userDocs, articleDocs)), articleDocs, topicDocs, userDocs ])
    })
    .catch(console.log)
}

module.exports = seedDB 
