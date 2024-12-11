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
        pool.query('select * from students')
        .then((data) => {
            console.log(JSON.stringify(data))
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

module.exports = { getStudents }