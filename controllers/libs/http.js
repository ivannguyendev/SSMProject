const request = require('request');

module.exports = {
    getData : function(input , cb){
        request.post('https://' + input.ip, { json: true }, (err, res, body) => {
            if (err || !res) { return console.log(err); }
            else {
             console.log(body + res)
            }
          });
    }
}