const User = require('../models/User.js')

const userByID = (req, res, next) => {
    const username = req.params.username
    return User.findOne({username: username})
    .then((user) => {
        if (!user) throw {status: 404, msg: 'username not found'}
        res.status(200).send({user})
    })
    .catch(next)

}

module.exports = userByID