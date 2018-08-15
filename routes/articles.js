const articlesRouter = require('express').Router()
const {allArticles, articleByID, commentsForArticle, updateArticleVote, addComment} = require('../controllers/articles.js')

articlesRouter.route('/')
    .get(allArticles)

articlesRouter.route('/:article_id')
    .get(articleByID)
    .put(updateArticleVote)

articlesRouter.route('/:article_id/comments')
    .get(commentsForArticle)
    .post(addComment)




module.exports = articlesRouter