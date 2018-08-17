const topicsRouter = require('express').Router()
const { allTopics, articlesByTopic, addArticleToTopic } = require('../controllers/topics.js')

topicsRouter.route('/')
    .get(allTopics)

topicsRouter.route('/:topic_slug/articles')
    .get(articlesByTopic)
    .post(addArticleToTopic)





module.exports = topicsRouter