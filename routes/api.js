var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('index');
  });

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
