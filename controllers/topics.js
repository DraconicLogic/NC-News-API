const {Topic, Article, Comment} = require('../models/index.js')


const allTopics = (req, res, next) => {
   return Topic.find().then((topics) => {
       if (topics.length === 0) throw {status: 404, msg: 'No topics in the database'}

      res.status(200).send({topics})
   })
   .catch(next)  
}

const articlesByTopic = (req, res, next) => {
    const slug = req.params.topic_slug
    return Article.find({belongs_to: slug}).then((articles)=> {
        if (articles.length === 0) throw {status: 404, msg: 'There are no articles belonging to this topic'}
        const articleIDs = []
        
        articles.forEach((article) => {
          articleIDs.push(article._id)
        })

        const comments = Comment.find({belongs_to: articleIDs})
        return Promise.all([comments, articles])  
    })
    .then(([comments, articles])=>{

        const commentCount = comments.reduce((obj, comment)=> {
            if (!obj[comment.belongs_to]) {obj[comment.belongs_to] = 1}
            else {obj[comment.belongs_to] += 1}
            return obj
        },{})

        
        articles.forEach((article)=>{
            if (!!commentCount[article._id]) {
                article.comments = commentCount[article._id]  
            }
        })
        console.log(articles,'<<<<< ARTICLEXS')
        //Could not add the comment count and not sure why the above code doesn't work. Maybe can't manipulate information in a promise
        res.status(200).send({articles})
        
    })
    .catch(next)
}

const addArticleToTopic = (req, res, next) => {
    const slug = req.params.topic_slug
    return Topic.findOne({slug},()=>{})
    .then((topic)=> {
        if (topic === null) throw {status: 404, msg: 'No such topic exists'}
        return Article.create(req.body)
    })
    .then((article) => {
        res.status(201).send(article)
    })
    .catch(next)
}

module.exports = {allTopics, articlesByTopic, addArticleToTopic}