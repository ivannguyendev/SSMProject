var express = require('express');
var router = express.Router();
var Token = require('./../model/Token')
var User = require('./../model/User')
var jwt = require('jsonwebtoken')
var configs = require('./configs')
var moment = require('moment')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  var input = req.body
  if(input.username || input.password) res.status(401).send({code : 401, success : false, status : "401 not username"})
  else {
    User.findOne({username: self._id, hashpass: input.password, status: 'OFFLINE'},function(error, result){
      if(error) res.status(400).json({code : 400, success : false, status: 'Error network'})
      else if(!result) res.status(400).json({code : 400, success : false, status: 'User not found'})
      else {
        var jwtToken = jwt.sign({username: input.username, hashpass: input.password}, config.jwtSecret, { expiresIn: 1 * 7 });
        Token.create({token: jwt, status: 'USING', expried: moment().add(30, 'day')}, (error, result)=>{
          if(error || !result) res.status(400).json({code : 400, success : false, status: 'User not found'})
          else res.status(200).json({code : 200, success : true, token : result.token})
        })
      }
    })
  }
});
/* POST users listing. */
router.post('/register', function(req, res, next) {
  req.isNew = true
  if(!req.body.username || req.body.username == '' || !req.body.password || req.body.password == '') res.status(400).json({code : 400, success : false, status: 'Username or Password is empty'})
  else {
    User.create({
      username: req.body.username,
      hashpass: req.body.password,
      status: 'OFFLINE',
    }, function(error, result){
      if(error || !result) res.status(400).json({code : 400, success : false, status: 'Register failed'})
      else res.status(200).JSON({code : 200, success : true, status: 'Register successful'})
    })
  }
});

//middleware
router.all('/*',(req, res, next)=>{
  if(!true) next()
  else {
    if(!req.headers.token){
      res.status(403).send({code : 403, success : false, status : "403 missing token"})
    }
    else {
      Token.findOne({token : req.headers.token})
      .exec(function(err, token){
        if(err){
          res.status(404).send({code : 404, success : false, status : "404 error connecting to user data", results: err})
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

router.get('/logout', function(req, res, next) {
  var input = req.body
  if(input.username || input.password) res.status(401).send({code : 401, success : false, status : "401 not username"})
  else {
    User.findOne({username: self._id, hashpass: input.password, status: 'ONLINE'},function(error, result){
      if(error) res.status(404).json({code : 404, success : false, status: 'Error network'})
      else if(!result) res.status(401).json({code : 401, success : false, status: 'User not found'})
      else {
        result.set({status: 'OFFLINE'})
        Token.remove({token: req.token}, (error, result)=>{
          if(error || !result) res.status(401).json({code : 401, success : false, status: 'User not found'})
          else res.redirect('../')
        })
      }
    })
  }
});

/* GET sensors listing. */
router.get('/sensor/:ip', function(req, res, next) {
    res.send('respond with a resource');
  });

/* POST sensors listing. */
router.post('/sensor/:ip', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET sensors listing. */
router.get('/sensor', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
