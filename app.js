const port = process.env.PORT || 8080;

//Base Variables for Express
var path = require('path');
var express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var conn =require('./lib/db');

//---ROUTING...SECTION---//
var indexRoute = require('./routes/index');
var authRoute = require('./routes/auth');
var EmployeesRoute = require('./routes/Employees');
var PersonalInfoRoute = require('./routes/PersonalInfo');

var app = express();

//---VIEW...ENGINE---//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---MIDDLE...WARES---//
//Setup Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Setup Sessions
app.use(cookieParser());
app.use(session({
    secret: '@cc@3147',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 120000}
}));
app.use(flash());

app.use('/Employees', EmployeesRoute);
//app.use('/auth', authRoute);
app.use('/PersonalInfo', PersonalInfoRoute);
app.use('/', indexRoute);

app.listen(port, () => console.log('Listening on port ${port}..'));

module.exports = app;