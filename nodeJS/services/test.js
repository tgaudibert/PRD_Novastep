const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();


var address ="b8-27-eb-43-18-a9"

bluetooth.connect(address, 1,(err, connection)=>{
  if(err) return console.error(err);

  connection.on('data', (buffer) => {
    var received_data = buffer.toString()
    console.log('received message:', received_data);
  });

  connection.write(new Buffer('Hello!', 'utf-8'), () => {
    console.log("wrote");
  });
});

device.findSerialPortChannel(address, channel=>{
  console.log('Found RFCOMM channel for serial port on %s: ', channel);
  console.log(address.replace(/-/g,':').toUpperCase())
});




device.on('finished',  console.log.bind(console, 'finished'))
  .on('found', function found(address, name){
    console.log(address + ' : ' + name)

}).scan();


address = "b8:27:eb:bc:e7:56"
