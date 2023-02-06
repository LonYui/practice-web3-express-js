var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('view engine', 'ejs');

// 設定 views 資料夾存放 ejs 檔案
app.set('views', path.join(__dirname, 'views'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/blog',(req ,res)=>{
    res.redirect('/')
})
app.get('/json-practice',(req ,res )=>{
    res.json({
        "result":"ok",
        "msg":"安安"
    })
})
app.get('/redirect-with-httpcode',(req, res)=>{
    res.redirect(301,'/')
})

app.get('/porn',(req,res)=>{
    res.status('404').end()
})

app.post('')
module.exports = app;

