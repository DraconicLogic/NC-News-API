const {Comment} = require('../models/index.js')

const updateCommentVote = (req, res, next) => {
    let upOrDown;
    if (req.query.vote === 'up') upOrDown = 1
    if (req.query.vote === 'down') upOrDown = -1
    if (upOrDown === undefined) throw {status: 400, msg: 'query must be either "up" or "down". All lower case'}
    const commentID = req.params.comment_id
    return Comment.findOneAndUpdate({_id: commentID}, {$inc:{votes: upOrDown}},{new: true})
    .then((comment) => {
        if (!comment) throw {status: 400, msg: 'comment does not exist'}
        res.status(200).send({comment})
    })
    .catch(next)
}
const deleteComment = (req, res, next) => {
    const commentID = req.params.comment_id

    return Comment.findOneAndDelete({_id: commentID})
    .then((comment) => {
        res.status(200).send({comment})
    })
    .catch(next)
}

module.exports = {updateCommentVote, deleteComment}