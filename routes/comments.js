const commentsRouter = require('express').Router()
const {updateCommentVote, deleteComment} = require('../controllers/comments.js')

commentsRouter.route('/:comment_id')
    .put(updateCommentVote)
    .delete(deleteComment)

module.exports = commentsRouter