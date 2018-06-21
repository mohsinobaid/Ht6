var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var querystring = require('querystring');

var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

//router.get('/', function(req, res){
//    res.send('Blank auth?!');
//});
//router.use(express.json());
//router.use(express.urlencoded());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

var whatAT;
var whatRT;

router.get('/', function(req, res){
console.log(req.bodylength);
//if(req.size>3){
  console.log('i need to sleep' + req.body + " and this is the code: " + req.query.code);
//}
//res.send(req.query.code);
//if(!res.query.code){
    var code = req.query.code;
    console.log(req.query.code);
    //console.log(req.json);
    //console.log("there was no code");

    var urlToken = "https://api.sandbox.wealthsimple.com/v1/oauth/token?client_id=2c6b0a3a90b9418b6adc9e133e76e651531e22c1e19069e06f6c7cca668aacda&client_secret=dd9e42acda3a07af972b29079120695910dcaf284cfa76e9d05786c60bb234d7&grant_type=authorization_code&redirect_uri=https://localhost:3000/auth&code=" + req.query.code;

//grant_type=authorization_code&

//this is The Python code that Ross posted.
//post_params[:client_id] = APPLICATION_ID
//    post_params[:client_secret] = APPLICATION_SECRET
  //  post_params[:grant_type] = 'authorization_code'
    //post_params[:redirect_uri] = REDIRECT_URI
    //post_params[:code] = code

    //full_params = "#{url}?#{post_params.to_query}"
    //response = HTTParty.post(full_params)

    //access_token = response['access_token']
    //refresh_token = response['refresh_token']

    //var responseToken;

    //request('http://www.google.com', function(error, response, body){
    request({
      headers: {
        'Authorization': 'Bearer ' + req.query.code,
      },
      uri:urlToken,
      method: 'POST'
    }, function(error, response, body){
  //}, urlToken, function(error, response, body){
//header pass in , bearer token
    console.log("Your new url is: " + urlToken);
    console.log('error:',error);
    console.log('statusCode:', response && response.statusCode);
    //console.log(response);
    body = JSON.parse(body);
    //resp = JSON.parse(response);
    console.log("wassup");
    var AT = body.access_token;
    var RT = body.refresh_token;
    console.log(AT);
    console.log(RT);
    //console.log(response.query.access_token);
    //var responseToken = response.query.authorization;

    //console.log(responseToken);
    //console.log('body:', body);
    whatAT = AT;
    whatRT = RT;

    res.redirect('/auth/home/#' +
      querystring.stringify({
        baccess_token: whatAT,
        brefresh_token: whatRT
      }));

    });
    console.log(whatAT);
    //console.log(AT);
//    var options = {
//      headers: {
//        'att': AT,
//        'rtt': RT
  //    }
//    };

    //res.sendFile(path.join(__dirname + '/views/second_v.html'));
    //res.sendFile(path.join(__dirname + '/views/song.html'));
    //res.sendFile(path.join(__dirname + '/views/song.html'), options)

});

router.get('/home', function(req, res){
    //res.send('You just invested ' + req.params.amount + '!! CONGRATS');
    //This is where i want to now use spotify's api
    console.log('get it get here man i need to study');
    res.sendFile(path.join(__dirname + '/views/song.html'));
});

router.get('/start', function(req, res){
    //res.send('You just invested ' + req.params.amount + '!! CONGRATS');
    //This is where i want to now use spotify's api
    console.log('get it get here man i need to study');
    res.sendFile(path.join(__dirname + '/views/song.html'));
});



router.get('/', function(req, res){
  var code = req.query.code;
  console.log(req.query.code);
  res.send(req.query.code);
  request('http://www.google.com', function(error, response, body){
      console.log('error:',error);
      console.log('statusCode:', response && response.statusCode);
      //console.log('body:', body);
  });

});



//router.post()


//router.get('/', function(req, res){
//  var name = req.query.name;
//  color = req.query.color;
//  console.log(req.query.name + " " + color);
//  res.send(req.query.name + ", you just turned " + req.query.color + "!!");
//});



//Oldershit
//router.post('/',urlencodedParser, function(req, res){
router.post('/a', function(req, res){
    if (!req.body) return res.sendStatus(400);
    console.log("ya");
    res.send('investing is fun!'+ req.code);
    next();
});

//router.get('/:code', function(req, res){
///  console.log("get?");
//    res.send('You just invested ' + req.params.code + '!! CONGRATS');
//});

module.exports = router;
