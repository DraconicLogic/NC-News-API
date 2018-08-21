const docs = require('../documentation.json')

const endpointDocs = (req, res, next) => {
 
 
    res.status(200).send(docs)


}


module.exports = endpointDocs