const { Article } = require('../models/index.js')

const allArticles = (req, res, next) => {
    return Article.find({}).then((articles) => {
        res.status(200).send({articles})
    })
    .catch(console.log)
}
const articleByID = () => {}
const commentsForArticle = () => {}
const updateArticleVote = () => {}
const addComment = () => {}

module.exports = {allArticles, articleByID, commentsForArticle, updateArticleVote, addComment}