const express = require('express')
const bodyParser = require('body-parser')
var mySqlDao = require('./mySqlDAO')
const app = express()
const ejs = require('ejs')

const port = 3004

app.use(bodyParser.urlencoded({extended: true}))

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

app.get('/students/edit/:sid', (req, res) => {

    res.render("editStudent", {id: req.params.sid})

})

app.post('/students/edit/:sid', (req, res) => {
    console.log(req.params.sid)
    mySqlDao.updateStudent(req.body.name, req.body.age, req.params.sid)
    .then(() => {
        console.log("Updated student of ID " + req.params.sid)
        res.redirect('/students')
    })
    .catch((error) => {
        res.send(error)
    })
})