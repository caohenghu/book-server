const express = require('express')
const router = express.Router()
const uuidV4 = require('uuid/v4')
const book = require('../services/book')

router.post('/', function (req, res) {
    let data = req.body
    data._id = uuidV4()
    data.count = parseInt(data.count || 1)
    book.addBook(data)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/', function (req, res) {
    let query = req.query
    let { pageIndex, pageCount } = query
    delete query.pageIndex
    delete query.pageCount
    for (let key in query) {
        if (query.hasOwnProperty(key) && query[key] === undefined) {
            delete query[key]
        }
    }
    book.getBooks(query, parseInt(pageIndex), parseInt(pageCount))
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', function (req, res) {
    // req.session.user = {name: 'abc'};
    let id = req.params.id
    book.getBook(id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', function (req, res) {
    let id = req.params.id
    let data = req.body
    data.count = parseInt(data.count)
    book.updateBook(id, data)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', function (req, res) {
    let id = req.params.id
    book.deleteBook(id)
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = router
