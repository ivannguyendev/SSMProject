
module.export = {
    getData: function (input, cb) {

        var coap = require('coap')
            , server = coap.createServer(),
            json, bl = require('bl')

        server.on('request', function (req, res) {

            return res.end('hellp' + json)

        }).listen(function () {
            var req = coap.request('coap://[aaaa::212:7402:2:202]:5683/sensors/light')

            req.on('response', function (res) {


                new Promise((resolve, reject) => {
                    res.pipe(bl(function (err, data) {

                        json = data
                        console.log(json)
                        resolve(json)
                    }))
                }).then(function (value) {
                    cb(null, 'hellp' + json)
                })

            })
            req.end()

        })

    }

}
