var mongoose = require('mongoose')
var moment = require('moment')
var token = require('./Token')

var userSchema = mongoose.Schema({
    username: String,
    hashpass: String,
    sensor: {type: String, ref: 'Sensor'}
});

userSchema.pre('save', function(next){
    let self = this
    mongoose.model('User', userSchema).findOne({username: self._id},function(err, res){
        if(err) next(new Error('User not found'))
        else if(self) next(new Error('User not found'))
        else next()
    })
})

var User = mongoose.model('User', userSchema);
module.exports = User
