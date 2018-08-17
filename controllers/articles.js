const { Article } = require('../models/index.js')

const allArticles = (req, res, next) => {
    return Article.find({}).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(console.log)
}
const articleByID = (req, res, next) => {
    const id = req.params.article_id;
    

    return Article.findById(id, ()=>{}).then((article) => {
        if (article === null) throw {status: 400, msg: 'ID not found'}
        res.status(200).send({article})
    })
    .catch(next)
}
const commentsForArticle = () => {}
const updateArticleVote = () => {}
const addComment = () => {}

module.exports = {allArticles, articleByID, commentsForArticle, updateArticleVote, addComment}