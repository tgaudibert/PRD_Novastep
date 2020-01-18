//import des différents modules
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ngrok = require('ngrok')
const cors = require('cors')
var Bluetooth = require('./services/bluetoothService')

app.use(cors())



//listen to active connections
io.on('connection',  client => {
  client.on('connect', () => {
    console.log('connection')
  });

  var ReceivedData = Bluetooth.bluetoothService.get_Bluetoothdata().subscribe(async function(data){
    console.log("new data")
    io.emit('capteur',data)
  })

  //gestion de l'évenement de déconnxion au serveur
  client.on('disconnect', () => {
    console.log('disconnected')
  });
});



server.listen( 3000, () => console.log(`App listening on port ${process.env.PORT}!`))









/*
//on crée un tunnel TCP pour accéder au serveur depuis n'importe ou dans le monde via une URL générée aléatoirement
ngrok.connect({
  proto: 'http',
  addr: '3000',
  authtoken: "2N2z78Hx9QrCSQojGrpNJ_7dD1YyHKeY7hC7oxevizV",
}).then(url => {

  console.log(`💳  App URL to see the demo in your browser: ${url}/`);
}).catch(err => {
  if (err.code === 'ECONNREFUSED') {
    console.log(`⚠️  Connection refused at ${err.address}:${err.port}`);
  } else {
    console.log(`⚠️  ${err}`);
  }
  process.exit(1);
});

*/
