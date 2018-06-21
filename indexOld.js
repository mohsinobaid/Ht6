var express = require('express');
var app = express();
var things = require('./things.js');
var invest = require('./invest.js');
var auth = require('./auth.js');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');

var holdThis;

app.set('view engine', 'pug');
app.set('views', './views');



app.use(cookieParser());
//var http = require('http');
//var https = require('https');
//var privateKey = fs.readFileSync('encryption/private.key')
//var certificate = fs.readFileSync('encryption/mydomain.csr');

//var credentials = {key: privateKey, cert: certificate};


//both index.js and things.js should be in the same directory

app.get('/first', function(req, res){
  res.render('first_view');
});

app.get('/dynamic', function(req, res){
    res.render('dynamic',{
        name: "Tutorial",
        url: "http://www.tutorialspoint.com"
    });
});

app.get(function(){

});

app.use('/things', function(req, res, next){
    console.log("A new request recieved at " + Date.now());
    //this functions call is very important. It tells that mroe processing is
    //required for the current request and is in the next middleware
    //function route handler.
    next();
});
app.use('/things',things);
app.use('/invest',invest);
app.use('/auth', auth);
//app.get('/auth:code', function(req, res){
//    console.log("A request for things recieved");
    //res.send('OK. Fuck Gandalf, you shall pass.');
//    holdThis = req.params.code;
//    console.log(holdThis);
    //next();
//});

app.use(bodyparser.json());


//app.httpsServer = https.createServer(credentials, app);
//httpsServer.listen(3000);
//app.createServer(options, app).listen(433);
app.listen(3000);
