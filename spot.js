var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var querystring = require('querystring');



//router.get('/', function(req, res){
//    res.send('Blank auth?!');
//});
//router.use(express.json());
//router.use(express.urlencoded());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


var client_id = '5ad9c850d1ee45c68455808fbd39ab8c';
var client_secret = '6cdb8d7712e74e5b89810f61fbdced21';
var redirect_uri = 'https://localhost:3000/spot/callback';

//what is this?
//var scopes = \user-read-private user-read-email\'';

router.get('/js/main', function(req, res){
  res.sendFile(path.join(__dirname + '/js/main.js'));
});

router.get('/login', function(req, res){

  //your application requests authorization
  var scope = 'user-read-private user-read-currently-playing user-read-email';
  console.log(client_id);
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
  //res.send('Login swag');
});

router.get('/callback', function(req, res){
  //your application requests refresh and  access tokens
  //after checking the state parameter
  var code = req.query.code || null;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  console.log('works till here?');

  request.post(authOptions, function(error, response, body){
    if(!error && response.statusCode === 200){
      var access_token = body.access_token,
      refresh_token = body.refresh_token;

      console.log(access_token);
      console.log(refresh_token);

      var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: {'Authorization': 'Bearer ' + access_token},
          json: true
      };

      //use the access token to access the Spotify Web api
      request.get(options, function(error, response, body){
        console.log(body);
      });

      //****
      //request the current playing song here.
      //****
      var currentsong = {
          url: 'https://api.spotify.com/v1/me/player/currently-playing',
          headers: {'Authorization': 'Bearer ' + access_token},
          json: true
      };

      request.get(currentsong, function(error, response, body){
        console.log(body);
      })

      //We can also pass the token to the browser to make requests from there
      //res.redirect('/#' +
      res.redirect('/spot/home/#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));

    }else{
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});

router.get('/home', function(req, res){
    //res.send('You just invested ' + req.params.amount + '!! CONGRATS');
    //This is where i want to now use spotify's api
    console.log('get it get here man i need to study');
    res.sendFile(path.join(__dirname + '/views/song.html'));
});

module.exports = router;
