const bluetooth = require('node-bluetooth');
const device = new bluetooth.DeviceINQ();


const { Subject } = require('rxjs');
const subject = new Subject();
const bluetoothService = {
    send_Bluetoothdata: data => subject.next({data}),
    get_Bluetoothdata: () => subject.asObservable()
};





bluetooth.connect("B8:27:EB:65:1A:5C", 1, function(err, connection){
  if(err) return console.error(err);

  connection.on('data', (buffer) => {
    var received_data = buffer.toString()
    console.log('received message:', received_data);
    bluetoothService.send_Bluetoothdata(received_data)
  });

  connection.write(new Buffer('Hello!', 'utf-8'), () => {
    console.log("wrote");
  });
});


module.exports = {
  bluetoothService
}


/*
device.on('finished',  console.log.bind(console, 'finished'))
.on('found', function found(address, name){
  console.log('Found: ' + address + ' with name ' + name);
  device.findSerialPortChannel(address, function(channel){
  console.log('Found RFCOMM channel for serial port on %s: ', name, channel);

  // make bluetooth connect to remote device


});
}).scan();
*/
