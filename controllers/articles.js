const { Article, Comment } = require('../models/index.js')

const allArticles = (req, res, next) => {
    return Article.find({}).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(next)
}
const articleByID = (req, res, next) => {
    const id = req.params.article_id;
    return Article.findById(id).then((article) => {
        if (article === null) throw {status: 404, msg: 'ID not found'}
        res.status(200).send({article})
    })
    .catch(next)
}
const commentsForArticle = (req, res, next) => {
    const id = req.params.article_id
    return Comment.find({belongs_to: id}).populate('created_by')
    .then((comments)=> {
        if (!comments.length) throw {status: 404, msg: 'There are no comments for this article'}
        res.status(200).send({comments}) 
    })
    .catch(next)
}

const updateArticleVote = (req, res, next) => {
    let upOrDown;
    if (req.query.vote === 'up') upOrDown = 1
    if (req.query.vote === 'down') upOrDown = -1
    if (upOrDown === undefined) throw {status: 400, msg: 'query must be either "up" or "down". All lower case'}
    const id = req.params.article_id;

    Article.findOneAndUpdate({_id: id}, {$inc:{votes: upOrDown}},{new: true}).then((article) => {
        if (article === null) throw {status: 404, msg: 'no such article in the database'}
        res.status(200).send({article})
    })
    .catch(next)
}
const addComment = (req, res, next) => {
    const articleID = req.params.article_id
    const comment = req.body
    return Article.findById(articleID)
    .then((article)=>{
        if (!article) throw {status: 404, msg: 'Article not found'}
        return Comment.create(comment)
    })
    .then((comment) => {
        return comment.populate('created_by').execPopulate()
        
    })
    .then((comment)=>{     
        res.status(201).send({comment})
    })
    .catch(next)
    
}

module.exports = {allArticles, articleByID, commentsForArticle, updateArticleVote, addComment}