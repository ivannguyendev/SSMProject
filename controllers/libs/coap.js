var request = require('request');
const configs = require('../../routes/configs')
module.export = {
    getData: function (input, cb) {
        request.get(configs.serverContiki + '/temp').on('response', function(response) {
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
          })

    }
}
