var mongoose = require('mongoose')
var moment = require('moment')
var tokenSchema = mongoose.Schema({
    token: String,
    expired : {type: Date, default: moment()}
});
var token = mongoose.model('Token', tokenSchema);

module.exports = token
