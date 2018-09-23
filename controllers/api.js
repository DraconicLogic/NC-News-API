const docs = require('../documentation.json')
const home = require('../homepage.json')


const endpointDocs = (req, res, next) => {
    res.status(200).send(docs)
}

const getHomePage = (req, res, next) => {
    res.status(200).send(home)
}


module.exports = {endpointDocs, getHomePage}