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

var updateStudent = function(sid, name, age) {
    return new Promise((resolve, reject) => {
        
    })
}

module.exports = { getStudents }