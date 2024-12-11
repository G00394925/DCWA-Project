const express = require('express')
const bodyParser = require('body-parser')
var mySqlDao = require('./mySqlDAO')
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

app.get('/students', (req, res) => {
    mySqlDao.getStudents()
    .then((data) => {
        res.render("students", {"student": data})
    })
    .catch((error) => {
        res.send(error)
    })
})