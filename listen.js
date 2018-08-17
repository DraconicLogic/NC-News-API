const app = require('./app.js')

const port = process.env.PORT || 9876
console.log(port,"LOOK FOR PORT")
app.listen(port,() => {
    console.log(`listening on port ${port}...`)
})