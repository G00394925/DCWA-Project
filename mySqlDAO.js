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
        pool.query('select * from student')
        .then((data) => {
            console.log(JSON.stringify(data))
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
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

module.exports = { getStudents, updateStudent }