var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var privateKey = fs.readFileSync('ssl/server.key','utf8');
var certificate = fs.readFileSync('ssl/server.crt','utf8');
const cors = require('cors');



//This middleware will now intercept every request and add the corresponding cors headers to the response.
var corsOption = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 //some legacy browsers
}
var things = require('./things.js');
var auth = require('./auth.js');
var spot = require('./spot.js');
var credentials = {key: privateKey, cert: certificate, passphrase: '1234'};

var app = express();

//your express configuration httpsServer
app.use('/things',things);
app.use('/auth', auth);
app.use('/spot', spot);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors(corsOption));
//app.use(querystring)
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');
//app.use(express.json());
//app.use(express.urlencoded());

app.get('/', function(req, res){
  //res.render('first_view');
  res.sendFile(path.join(__dirname + '/views/song.html'));
  //es.sendFile(path.join(__dirname + '/splash.html'));
});


//this is where the spot code was


//angular practice. Creading, editing Cat objects
app.route('/api/cats').get((req,res) => {
  res.send({
    cats: [{name: 'lilly'}, {name: 'lucy'}]
  });
});

app.route('/api/cats/:name').get((req,res) => {
  const requestedCatName = req.params['name'];
    res.send({name: requestedCatName});
});

app.route('api/cats').post((req, res) => {
  res.send(201, req.body);
});

//To Modify existing objects
//Changing an Object at ab
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var io = require('socket.io')(httpsServer);

app.engine('jade', require('jade').__express);
app.set('view engine', 'jade');




httpServer.listen(8080);
httpsServer.listen(3000);

//deleting an object at an Endpoint
app.route('/api/cats/:name').delete((req, res) => {
  res.sendStatus(204);
});

//Middleware is a very broad and abstract concept. Basically, it is software, that is placed between two other components. Well, I told you it is abstract...
//Everything in express is middleware. There is some component that takes the incoming requests and there is som component that spits out the responses. Everything in between is handled by middleware.
