const express = require('express')
const bodyParser = require('body-parser')
var mySqlDao = require('./mySqlDAO')
var mongoDAO = require('./mongoDAO')
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

app.get('/students/add', (req, res) => {
        res.render("addStudent", {"errors": undefined})
})

app.post('/students/add', [
        check("name").isLength({min: 2})
        .withMessage("Student Name should be at least 2 characters"),

        check("age").isInt({gt: 17})
        .withMessage("Student must be older than 18")
    ], 
    
    (req, res) => {
    
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.render("addStudent", {errors: errors.errors})
        }

        else {
        
            mySqlDao.addStudent(req.body.id, req.body.name, req.body.age)
            .then(() => {
                res.redirect('/students')
            })
    
            .catch((error) => {
                res.send(error)
            })
        }
})

app.get('/grades', (req, res) => {
    mySqlDao.getGrades()
    .then((data => {
        res.render("grades", {"grade": data})
    }))
    .catch((error) => {
        res.send(error)
    })
})

app.get('/lecturers', (req, res) => {
    mongoDAO.showLecturers()
    .then((data) => {
        res.render("lecturers", {"lecturer": data})
    })
    .catch((error) => [
        res.send(error)
    ])
})

app.get('/lecturers/delete/:lid', async (req, res) => {
    const id = req.params.lid 
    const result = await mySqlDao.getLecturerByID(id) // Check if lecturer ID is found in 'modules' table

    if (result == "") { // Lecturer ID not found in module -- no associated modules
        
        mongoDAO.deleteLecturer(req.params.lid)
        .then(() => {
            res.redirect('/lecturers')
        })
        .catch((error) => {
            res.send(error)
        })
    }

    else {
        res.send("<h1>Cannot delete lecturer " + req.params.lid + " as they have associated modules.</h1>")
    }
})