var forEach = require('lodash.foreach');
var ObjectID = require('mongodb').ObjectID;
const   mongoose = require('mongoose'),
        sensorlModel = require('../model/Sensor'),
        sensorCtl = require('../sensors/thermometer');

function ledOnOff(req, res){
    // console.log('a');
    var coap = require('coap')
    , server = coap.createServer()
  
    server.on('request', function(req, res) {
    res.end('Hello ' + req.url.split('/')[1] + '\n')
     })
  
     // the default CoAP port is 5683
    server.listen(function() {
    var req = coap.request('http://192.168.225.1')
  
    req.on('response', function(res) {
      res.pipe(process.stdout)
      res.on('end', function() {
        // process.exit(0)
      })
    })
  
     req.end()
    })
}

module.exports = { 
    createSensor: function(req, res){
        var sensor = new sensorlModel({
            _id: new ObjectID(),
            name: req.body.name,
            ip: req.body.ip,
            protocol: req.body.protocol
        }).save(function(err){
            if(err){
                res.status(504);
                res.end();
            }else{
                console.log('saved');
                return res.status(200).json({
                    message: 'Saved'
                });
            }
        })
    },

    getSensor: function(req, res){

        sensorlModel.find({}, function(err, sensors) {
            if (err) {
              return res.status(500).json({
                err: err || err.errmessage
              })
            } else {
              return res.status(200).json(sensors)
            }
          })
    },

    postSensor: function(req, res){
    
        console.log(req.query.ip);
        sensorlModel.find({}, function(err, sensors) {
            if (err) {
                return res.status(500).json({
                err: err || err.errmessage
                })
            } else {
                switch(req.query.ip){
                    case sensors[0].ip: {
                        // console.log(req.query.data);
                        if(req.query.data){
                            ledOnOff(req, res);           

                        }else
                        console.log(sensors[0].ip);
                        // sensorCtl.temperature;
                        break;
                    }
                    case sensors[1].ip: {
                        console.log(sensors[1].ip);

                    }
                }
                
                return res.status(200).json(sensors);
            }
            })
      
    }
}