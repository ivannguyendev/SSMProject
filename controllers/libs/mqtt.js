

var express = require('express'),
router = express.Router(),
aesjs = require('aes-js')

var host = "100.100.11.229";

router.get('/', (req, res) => {

    // res.render('about', {page: 'contact', logged : true, schoolName: "Admin", alert_danger: '', alert_success: ''});

});

router.post('/', (req, res) => {

    var content = req.body.txtContent,
        topic = 'topic/test123';
        console.log(req.body.txtContent);

    let option = {
        port	: 1883,
        host	: 'mqtt://192.168.11.229',
        cliendId: 'NodejsServer'+Math.random().toString(16).substr(2,8),
        username: 'vihu',
        password: '1',
        keepalive: 60,
        reconnectPeriod: 1000,
        protocolId: 'MQIsdp',
        protocolVersion: 3,
        clean: true,
        encoding: 'utf8'
    }


    
        var mqtt = require('mqtt')
        var client  = mqtt.connect("mqtt://192.168.11.229", option);

        client.on('connect', function () {
            console.log('content: ', content);
            client.publish(topic, content);
        })
         
        client.on('message', function (topic, message) {
            console.log(message.toString())
            client.end()
        })

        client.on('error', function(err){
            console.log(err);
        })
        //res.render('about', {page: 'contact', logged : true, schoolName: "Admin", alert_danger: '', alert_success: "Gửi thành công!"})
        res.end();

});

module.exports = router;
