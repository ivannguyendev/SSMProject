var mongoose = require('mongoose')
var moment = require('moment')
var userSchema = mongoose.Schema({
    username: String,
    hashpass: String,
    sensor: {type: String, ref: 'Sensor'}
});

userSchema.pre('save', function(next){
    let self = this
    User.findOne({username: self._id},function(err, res){
        if(err) next(new Error('User not found'))
        else if(self) next(new Error('User not found'))
    })
})

var User = mongoose.model('User', userSchema);
module.exports = User
