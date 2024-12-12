var pmysql = require('promise-mysql')
var pool

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'proj2024mysql'
})
.then((p) => {
    pool = p
})
.catch((e) => {
    console.log("Pool error: " + e)
})

var getStudents = function() {
    return new Promise((resolve, reject) => {
        pool.query('select * from student ORDER BY sid ASC')
        .then((data) => {
            console.log(JSON.stringify(data))
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var getStudentByID = function(id) {
    return new Promise((resolve, reject) => {
        var query = {
            sql: 'select * from student where sid=?',
            values: id 
        }
        pool.query(query)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => [
            reject(error)
        ])
    })
}

var updateStudent = function(name, age, sid) {
    return new Promise((resolve, reject) => {
        var query = {
            sql: 'update student SET name=?, age=? WHERE sid=?',
            values: [name, age, sid]

        }
        pool.query(query)
        .then((data) => {
            console.log(sid, name, age)
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var addStudent = function(sid, name, age) {
    return new Promise((resolve, reject) => {
        var query = {
            sql: 'INSERT INTO student VALUES (?, ?, ?)',
            values: [sid, name, age]
        }

        pool.query(query)
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var getGrades = function() {
    return new Promise((resolve, reject) => [
        pool.query('SELECT student.name AS Student, module.name, grade.grade FROM module LEFT JOIN grade ON module.mid = grade.mid RIGHT JOIN student ON student.sid = grade.sid ORDER BY student.name ASC, grade.grade ASC')
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    ])
}
module.exports = { getStudents, updateStudent, addStudent, getStudentByID, getGrades }