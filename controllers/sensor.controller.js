var forEach = require('lodash.foreach');
var ObjectID = require('mongodb').ObjectID;
var checkip = require('./checkip')

const   mongoose = require('mongoose'),
        sensorlModel = require('../model/Sensor'),
        userModel = require('../model/User'), 
        coap = require('./libs/coap')

module.exports = { 
    createSensor: function(req, res){
        if(req.body.ip && checkip(req.body.ip)) {
            new sensorlModel({
                _id: new ObjectID(),
                name: req.body.name ? req.body.name : req.body.ip,
                ip: req.body.ip,
                protocol: req.body.protocol ? req.body.protocol : '',
                user: req.body.username
            }).save(function(error, sensors){
                if(error || !sensors){
                    res.status(401).json({status: error.toString()});
                    res.end();
                }else{
                    userModel.findOne({username: req.body.username}).exec((error, users)=>{
                        if(error || !users) return res.status(500).json(error)
                        else {
                            users.sensor.addToSet(sensors._id)
                            users.save()
                            return res.status(200).json(users)
                        }
                    })
                }
            })
        } else res.status(412).json({status:'ip is require'})
        
    },

    getSensor: function(req, res){
        var input = req.query
        userModel.findOne({username: input.username})
        .populate({path : 'sensor', model: sensorlModel})
        .exec(function(error, result){
            if (error || !result) {
                return res.status(500).json(error)
              } else {
                return res.status(200).json(result.sensor)
              }
        })
    },

    getDataSensor: function(req, res){
        var input = req.query
        coap.getSensor(input, function(err, res){
            if(err || !res) res.status(400).json(err)
            else {
                res.status(200).json(result.sensor)
            }
        })
    },

    postSensor: function(req, res){
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