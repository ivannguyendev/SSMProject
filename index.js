const coap = require("coap");
const app = require("./app");
const server = coap.createServer(app);
const port = '9000'
server.listen(port,() => {
    console.log("The CoAP server is now running.\n" + app.help);
});
