let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let app = express();
let httpHelper = require('./utils/httpHelper');
let bookParser = require('./utils/bookParser');
let fs = require('fs');
let iconv = require('iconv-lite');
let bookCtrl = require('./controllers/book');
let userCtrl = require('./controllers/user');


// app.use(cookieParser());
app.use(bodyParser());


// app.use(session({
//     store: new MongoStore({ // 本地存储session（也可以选择其他store，比如redis的)
//         url: 'mongodb://localhost:27017/book',
//         ttl: 10
//     }),
//     resave: false, // 是否每次都重新保存会话，建议false
//     saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
//     secret: 'keyboard cat',  // 用来对sessionId相关的cookie进行签名
// }));

// app.use(function (req, res, next) {
//     let url = req.originalUrl;//获取url
//     if(!req.session.user && url !== "/login" && url !== "/register"){
//         // return res.redirect("/login");
//         res.status(401);
//         res.send({
//             code: 401,
//             msg: '未登录',
//             data: null
//         });
//     } else {
//         next();
//     }
// });

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
    // res.header('X-Powered-By', '3.2.1'); // 不设置也没有关系，会默认为Express
    // res.header('Content-Type', 'application/json; charset=utf-8'); // 不设置也没关系，会默认为text/html; charset=utf-8
    next();
});


app.use('/book', bookCtrl);
app.use('/user', userCtrl);


app.get('/jd/book/:url', (req, res) => {
    // let buffer = fs.readFileSync("./utils/1.html");
    // let data = iconv.decode(buffer, 'gbk');
    // let result = bookParser(data);
    //
    // res.send({code: 0, error: '', data: result});
    let url = decodeURIComponent(req.params.url);
    httpHelper.get(url, 10000, function(err, data) {
        let result = bookParser(data);
        res.send({code: 0, error: '', data: result});
    }, 'gbk');
});

let server = app.listen(3000, function () {
    let address = server.address();
    let host = address.address;
    let port = address.port;

    console.log(server);

    console.log('Example app listening at http://%s:%s', host, port);
});