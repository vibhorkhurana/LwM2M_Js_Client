var CoapNode = require('../index.js'),
    SmartObject = require('smartobject'),
    gpio = require('rpi-gpio');

var so = new SmartObject();
var value = 1
so.init(3349, 0, {
    5850: {
        write: function(val, cb) {
            gpio.setup(37, gpio.DIR_OUT, () =>
                gpio.write(37, val, function(err) {
                    if (err) throw err;
                    console.log('Written to pin' + val);
                })
            );
            cb(null, val);
        }
    }
});

var coapNode = new CoapNode('coap-node-test', so, { lifetime: 300 });

coapNode.on('registered', function() {
    console.log('registered');
});

coapNode.on('deregistered', function(msg) {
    console.log('deregistered');
});

coapNode.on('login', function(msg) {
    console.log('login');
});

coapNode.on('logout', function(msg) {
    console.log('logout');
});

coapNode.on('offline', function(msg) {
    console.log('offline');
});

coapNode.on('reconnect', function(msg) {
    console.log('reconnect');
});

coapNode.on('error', function(err) {
    console.log(err);
});

coapNode.register('10.42.0.5', 5683, function(err, rsp) {
    console.log(rsp);
});
