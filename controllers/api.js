const docs = require
('../documentation.json')
const fs = require('fs')

const endpointDocs = (req, res, next) => {
 
 
    res.status(200).render('../views/docsAPI.html')


}


module.exports = endpointDocs 