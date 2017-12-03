var mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;
var schema = mongoose.Schema;

var sensorSchema = new schema({

    _id: schema.Types.ObjectId,
    ip: String,
    name: String,
    protocol: String    
});
var Sensor = mongoose.model('sensors', sensorSchema);

module.exports = Sensor
