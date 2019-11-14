const initMongo = require('../mongodb')
const obj = require('./result')

module.exports = {
    addUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}

function addUser(data) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let user = db.collection('user')
            return user.insertOne(data)
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
        .catch((err) => {
            console.error(err)
            obj.code = 1001
            obj.error = '服务器异常'
            return Promise.reject(obj)
        })
}

function getUsers(search, pageIndex, pageCount) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let user = db.collection('user')
            return user.find(search).skip((pageIndex - 1) * pageCount).limit(pageCount)
        })
        .then((result) => result.toArray())
        .then((result) => {
            _db.close()
            result = result.map(item => {
                item.id = item._id
                delete item._id
                return item
            })
            obj.data = result
            return obj
        })
}

function getUser(id) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let user = db.collection('user')
            return user.findOne({ _id: id })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}

function updateUser(id, data) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let user = db.collection('user')
            return user.updateOne({ _id: id }, { $set: data })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}

function deleteUser(id) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let user = db.collection('user')
            return user.removeMany({ _id: id })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}
