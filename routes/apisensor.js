var sensorClt = require('../controllers/sensor.controller');
var express = require('express');
var router = express.Router();

router.post('/save', sensorClt.createSensor);

router.get('/', sensorClt.getSensor);

router.post('/dosomething', sensorClt.postSensor);
module.exports = router;