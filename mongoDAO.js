const MongoClient = require('mongodb').MongoClient

var db
var coll

MongoClient.connect('mongodb://127.0.0.1:27017')
.then((client) => {
    db = client.db('proj2024MongoDB')
    coll = db.collection('lecturers')
})
.catch((error) => {
    console.log(error.message)
})

var showLecturers = function() {
    return new Promise(async (resolve, reject) => {

        const query = [ { $sort: { _id: 1 } } ]
        
        var cursor = await coll.aggregate(query)
        cursor.toArray()
        
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

var deleteLecturer = function(id) {
    return new Promise((resolve, reject) => {
        coll.deleteOne({_id: id})
        .then((data) => {
            resolve(data)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

module.exports = { showLecturers, deleteLecturer }