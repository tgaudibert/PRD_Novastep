//import des différents modules
const express = require('express');
var app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ngrok = require('ngrok')
const cors = require('cors')
var Bluetooth = require('./services/bluetoothService')

app.use(cors())

app.use('/dist', express.static(__dirname + '/dist'))
//partie serveur statique
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});






//partie socket.IO
io.on('connection',  client => {
  client.on('getDevices', async function(data){
    console.log('connection')
    var data = await Bluetooth.getDevices()
    io.emit('devices',data)
  });

  var ReceivedData = Bluetooth.bluetoothStream.get_Bluetoothdata().subscribe(async function(data){
    console.log("new data")
    io.emit('capteur',data)
  })

  var ReceivedDevices = Bluetooth.bluetoothDevice.get_BluetoothDevices().subscribe(async function(data){
    console.log("new device")
    io.emit('devices',data)
  })


  client.on('connect_toDevice', data => {
    console.log(data)
    Bluetooth.connect(data)
    console.log('connection')
  });

  //gestion de l'évenement de déconnxion au serveur
  client.on('disconnect', () => {
    console.log('disconnected')
    ReceivedData.unsubscribe()
    ReceivedDevices.unsubscribe()
  });
});


server.listen( 3000, () => console.log(`App listening on port ${process.env.PORT}!`))












//on crée un tunnel TCP pour accéder au serveur depuis n'importe ou dans le monde via une URL générée aléatoirement
ngrok.connect({
  proto: 'http',
  addr: '3000',
  authtoken: "2N2z78Hx9QrCSQojGrpNJ_7dD1YyHKeY7hC7oxevizV",
}).then(url => {

  console.log(`💳  App URL to see the demo in your browser: ${url}/`);
}).catch(err => {
  if (err.code === 'ECONNREFUSED') {
    console.log(err)
    console.log(`⚠️  Connection refused at ${err.address}:${err.port}`);
  } else {
    console.log(`⚠️  ${err}`);
  }
  process.exit(1);
});
