var mongoose = require('mongoose')
var moment = require('moment')
var tokenSchema = new mongoose.Schema({
    token: String,
    status: {type: String, options: 'USING, EXPIRED, CANCELLED'},
    expired : {type: Date},
    user : {type: String, ref: 'User'}
});

var token = mongoose.model('Tokens', tokenSchema);

module.exports = token
