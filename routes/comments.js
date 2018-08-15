const commentsRouter = require('express').Router()
const {updateCommentVote, deleteComment}

commentsRouter.route('/:comment_id')
    .put(updateCommentVote)
    .delete(deleteComment)

module.exports = commentsRouter