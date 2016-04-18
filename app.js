var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');



var app = express();

app.use(morgan('dev'));

// BODY PARSER - retrieve POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
var topics = require('./routes/topics');
app.use('/api/topics', topics);


//404
app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    next(err);
});

//500 and log 404
app.use(function(err, req, res, next) {
    console.error("["+(err.status || 500)+"] "+(new Date()).toString()+" "+req.url +' '+ err);
    var message = err.status == 404 ? err.message : "Unknown error";
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: message //should by default hide in production
    });
});

// hard mistake or crash
process.on('uncaughtException', function (err) {
    console.error((new Date()).toString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

module.exports = app;
