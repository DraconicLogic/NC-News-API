const usersRouter = require('express').Router()
const userByID = require('../controllers/users.js')

usersRouter.route('/:username')
    .get(userByID)

module.exports = usersRouter