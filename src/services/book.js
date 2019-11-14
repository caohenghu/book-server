const initMongo = require('../mongodb')
const obj = require('./result')

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}

function addBook(data) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let book = db.collection('book')
            return book.insertOne(data)
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

function getBooks(search, pageIndex, pageCount) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let book = db.collection('book')
            return book.find(search).skip((pageIndex - 1) * pageCount).limit(pageCount)
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

function getBook(id) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let book = db.collection('book')
            return book.findOne({ _id: id })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}

function updateBook(id, data) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let book = db.collection('book')
            return book.updateOne({ _id: id }, { $set: data })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}

function deleteBook(id) {
    let _db = null
    return initMongo()
        .then((db) => {
            _db = db
            let book = db.collection('book')
            return book.removeMany({ _id: id })
        })
        .then((result) => {
            _db.close()
            result.id = result._id
            delete result._id
            obj.data = result
            return obj
        })
}
