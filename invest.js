var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extend:false});

router.post('/',urlencodedParser, function(req, res){
    res.send('investing is fun!'+ req.code);

});

router.get(':amount', function(req, res){
    res.send('You just invested ' + req.params.amount + '!! CONGRATS');
});

module.exports = router;
