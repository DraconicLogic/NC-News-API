const topicsRouter = require('express').Router()
const {AllTopics, articleByTopic, addArticleToTopic} = require('../controllers/topics.js')

topicsRouter.route('/')
    .get(AllTopics)

topicsRouter.route('/:topic_slug/articles')
    .get(articleByTopic)
    .post(addArticleToTopic)





module.exports = topicsRouter