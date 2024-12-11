const express = require('express')
const bodyParser = require('body-parser')
var mySqlDao = require('./mySqlDAO')
const app = express()
const ejs = require('ejs')
const { check, validationResult } = require('express-validator');

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
    res.render("editStudent", {id: req.params.sid, "errors": undefined})
})

app.post('/students/edit/:sid', [
        check("name").isLength({min: 2})
        .withMessage("Student Name should be at least 2 characters"),

        check("age").isInt({gt: 17})
        .withMessage("Student must be older than 18")
    ],

    (req, res) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.render("editStudent", {id: req.params.sid, errors: errors.errors})
        }

        else{
            mySqlDao.updateStudent(req.body.name, req.body.age, req.params.sid)
            .then(() => {
                console.log("Updated student of ID " + req.params.sid)
                res.redirect('/students')
            })
            .catch((error) => {
                res.send(error)
            })

    }
})