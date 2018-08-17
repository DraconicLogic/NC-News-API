const app = require('./app.js')

const port = 9876

app.listen(port,() => {
    console.log(`listening on port ${port}...`)
})