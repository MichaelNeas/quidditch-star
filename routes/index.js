var express = require('express');
var router = express.Router();
var qsolver = require('../public/javascripts/aStarSol2');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//api handler
router.post('/qsolver', function(req, res) {
  qsolver.tester(req.body)
    .then(function(move){
      console.log(move)
      return res.send({"action":move});
    });
});

module.exports = router;
