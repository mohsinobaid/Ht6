var express = require('express');
var router = express.Router();

router.get('/:name/:id', function(req, res){
    res.send('id is: ' + req.params.id + ' and name is: ' +req.params.name);
});
router.post('/:k', function(req, res){
    res.send('POST route on things.');
});
router.get('/', function(req, res){
    res.send('GET route on things.');
});

module.exports = router;
