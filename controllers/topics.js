const {Topic, Article} = require('../models/index.js')


const allTopics = (req, res, next) => {
   return Topic.find().then((topics) => {
       if (topics.length === 0) throw {status: 400, msg: 'No topics in the database'}

      res.status(200).send({topics})
   })
   .catch(next)  
}

const articlesByTopic = (req, res, next) => {
    const slug = req.params.topic_slug
    return Article.find({belongs_to: slug}).then((articles)=> {
        if (articles.length === 0) throw {status: 400, msg: 'There are no articles belonging to this topic'}

        res.status(200).send({articles})
    })
    .catch(next)
}

const addArticleToTopic = (req, res, next) => {
    const slug = req.params.topic_slug
    return Topic.findOne({slug},()=>{})
    .then((topic)=> {
        if (topic === null) throw {status: 400, msg: 'No such topic exists'}
        return Article.create(req.body)
    })
    .then((article) => {
        res.status(201).send(article)
    })
    .catch(next)
}

module.exports = {allTopics, articlesByTopic, addArticleToTopic}