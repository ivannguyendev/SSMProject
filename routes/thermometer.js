const Router = require("../libs/router");
const router = Router();

const thermometer = require("../sensors/thermometer");

router.get("/", (req, res) => {
    writeJSON(res, {
        temperature: thermometer.temperature,
        humidity: thermometer.humidity,
        timestamp: new Date().getTime()
    });
    res.end();
});

router.observe("/", (req, res) => {
    function _onupdate()
    {
        writeJSON(res, {
            temperature: thermometer.temperature,
            humidity: thermometer.humidity,
            timestamp: new Date().getTime()
        });
    }

    console.log("Start observing...");
    thermometer.on("update", _onupdate);
    res.on("finish", err => {
        thermometer.removeListener("update", _onupdate);
        console.log("End observing.");
    });
});

router.get("/temperature", (req, res) => {
    writeJSON(res, {
        temperature: thermometer.temperature,
        timestamp: new Date().getTime()
    });
    res.end();
});

router.get("/humidity", (req, res) => {
    writeJSON(res, {
        humidity: thermometer.humidity,
        timestamp: new Date().getTime()
    });
    res.end();
});




function writeJSON(res, json)
{
    res.setOption("Content-Format", "application/json");
    res.write(JSON.stringify(json));
}

module.exports = router;