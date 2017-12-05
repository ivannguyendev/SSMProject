var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;
var schema = mongoose.Schema;
var sensorlModel = require('../model/Sensor')


var sensorSchema = new schema({
    _id: schema.Types.ObjectId,
    ip: String,
    name: String,
    protocol: String, 
    user : {type: String, ref: 'User'}
});

sensorSchema.pre('save', function(next){
    let self = this
    if(self.isNew && self.user) {
        mongoose.model('sensors').findOne({ip: self.ip},function(err, res){
            if(err) {
                console.log('debug1 : '+err)
                next(new Error('Error network'))
            }
            else if(res) next(new Error('Sensor existed'))
            else next()
        })
    } else {
        mongoose.model('sensors').findOne({ip: self.ip},function(err, res){
            if(err || !res) next(new Error('Sensor not found'))
            else next()
        })
    }
})

var Sensor = mongoose.model('sensors', sensorSchema);

module.exports = Sensor
