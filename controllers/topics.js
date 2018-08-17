const {Topic, Article} = require('../models/index.js')


const allTopics = (req, res, next) => {
   return Topic.find({}).then((topics) => {
      res.status(200).send({topics})
   })
   .catch(next)  
}

const articlesByTopic = (req, res, next) => {
    const slug = req.params.topic_slug
    return Article.find({belongs_to: slug}).then((articles)=> {
        res.status(200).send({articles})
    })
}
const addArticleToTopic = () => {}

module.exports = {allTopics, articlesByTopic, addArticleToTopic}