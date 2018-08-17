const topicsRouter = require('express').Router()
const { allTopics, articleByTopic, addArticleToTopic } = require('../controllers/topics.js')

topicsRouter.route('/')
    .get(allTopics)

topicsRouter.route('/:topic_slug/articles')
    .get(articleByTopic)
    .post(addArticleToTopic)





module.exports = topicsRouter