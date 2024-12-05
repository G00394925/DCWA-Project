const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const ejs = require('ejs')

const port = 3004

app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log("Server is listening on port " + port)
})

app.get('/', (req, res) => {
    res.render("home")
})