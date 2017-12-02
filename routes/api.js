var express = require('express');
var router = express.Router();
var nToken = require('./../model/Token')
var Token = new nToken()
var nUser = require('./../model/User')
var User = new nUser()

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var input = req.body
  var data = {
    username : input.username || res.status(401).send({code : 401, success : false, status : "401 not username"}),
    hashpass:  req.password || res.status(401).send({code : 401, success : false, status : "401 not password"})
  }
  User.findOne({username: self._id},function(err, res){
    if(err) next(new Error('User not found'))
    else if(self) next(new Error('User not found'))
    else next()
})
});

//middleware
router.all('/*',()=>{
  if(!config.authentication.enable) next()
  else {
    if(!req.headers.token){
      res.status(401).send({code : 401, success : false, status : "403 missing token"})
    }
    else {
      Token.findOne({token : req.headers.token})
      .exec(function(err, token){
        if(err){
          res.status(401).send({code : 404, success : false, status : "404 error connecting to user data", results: err})
        }
        else if(!token){
          res.status(401).send({code : 401, success : false, status : "401 invalid token"})
        }
        else if(token) {
          // TEST: it should track req user
          req.user = token.user 
          next()
        }
      })
    }
  }
})
/* GET users listing. */
router.get('/sensor/:ip', function(req, res, next) {
    res.send('respond with a resource');
  });

/* POST users listing. */
router.post('/sensor/:ip', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/sensor', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
