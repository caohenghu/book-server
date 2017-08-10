const express = require('express');
const router = express.Router();
const uuidV4 = require('uuid/v4');
const moment = require('moment');
const user = require('../services/user');

router.post('/', function (req, res) {
    // let data = req.body;
    let data = {
        number: '001',
        username: 'liudehua',
        realname: '刘德华',
        password: '1',
        addTime: Date.now(),
        group: '销售部',
        mobile: '13122223333',
        type: 1 // 1管理员、2普通人
    };
    data._id = uuidV4();
    user.addUser(data)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/', function (req, res) {
    let query = req.query;
    let {pageIndex, pageCount} = query;
    delete query.pageIndex;
    delete query.pageCount;
    for (let key in query) {
        if (query.hasOwnProperty(key) && query[key] === undefined) {
            delete query[key];
        }
    }
    user.getUsers(query, parseInt(pageIndex), parseInt(pageCount))
        .then((result) => {
            result.data.forEach(i => i.addTime = moment(i.addTime).format('YYYY-MM-DD hh:mm:ss'));
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.get('/:id', function (req, res) {
    // req.session.user = {name: 'abc'};
    let id = req.params.id;
    user.getUser(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let data = req.body;
    data.count = parseInt(data.count);
    user.updateUser(id, data)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    user.deleteUser(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;