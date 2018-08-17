const {Topic} = require('../models/index.js')

const allTopics = (req, res, next) => {
   return Topic.find({}).then((topics) => {
      res.status(200).send({topics})
   })
   .catch(console.log)  
}

const articleByTopic = (req, res, next) => {

}
const addArticleToTopic = () => {}

module.exports = {allTopics, articleByTopic, addArticleToTopic}