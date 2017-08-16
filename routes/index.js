var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//api handler
router.post('/qsolver', function(req, res) {
    res.send('{"action":"E"}');
});

module.exports = router;
