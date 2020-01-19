const bluetooth = require('node-bluetooth');



const { Subject } = require('rxjs');
const subject1 = new Subject();
const subject2 = new Subject();

const bluetoothStream = {
    send_Bluetoothdata: data => subject1.next(data),
    get_Bluetoothdata: () => subject1.asObservable()
};

const bluetoothDevice = {
    send_BluetoothDevices: data => subject2.next(data),
    get_BluetoothDevices: () => subject2.asObservable()
};



function getDevices(){
  return new Promise((resolve,reject)=>{
    console.log("hello")
    var founded = []
    const device = new bluetooth.DeviceINQ();
    device.on('finished',  console.log.bind(console, 'finished'))
      .on('found', function found(address, name){
        founded.push(address + ' : ' + name)
        console.log(founded)
        //resolve(founded)
        bluetoothDevice.send_BluetoothDevices(founded)
    }).scan();
  })
}




function connect(address){
  bluetooth.connect(address.replace(/-/g,':').toUpperCase(), 1,(err, connection)=>{
    if(err) return console.error(err);

    connection.on('data', (buffer) => {
      var received_data = buffer.toString()
      console.log('received message:', received_data);
      bluetoothStream.send_Bluetoothdata(received_data)
    });

    connection.write(new Buffer('Hello!', 'utf-8'), () => {
      console.log("wrote");
    });
  });

  const device = new bluetooth.DeviceINQ();
  device.findSerialPortChannel(address, channel=>{
    console.log('Found RFCOMM channel for serial port on %s: ', channel);
    console.log(address.replace(/-/g,':').toUpperCase())
  });
}



module.exports = {
  bluetoothStream,
  connect,
  getDevices,
  bluetoothDevice
}
