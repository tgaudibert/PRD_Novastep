const bluetooth = require('node-bluetooth');

// create bluetooth device instance
const device = new bluetooth.DeviceINQ();

var i = []




bluetooth.connect("B8:27:EB:65:1A:5C", 1, function(err, connection){
  if(err) return console.error(err);
  connection.write(new Buffer('Hello!', 'utf-8'), () => {
    console.log("wrote");
  });
});

device.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
  device.findSerialPortChannel(address, function(channel){
  console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

  // make bluetooth connect to remote device


});
}).scan();
