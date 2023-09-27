var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', usersRouter);

app.use('/products', indexRouter);
app.use((err, req, res,next)=>{
    res.status(500).json({error:err.message})
})
// app.use('/', indexRouter);

module.exports = app;
