require('dotenv').config();


//Server
const Server = require('./models/server')

const server = new Server();

//Mostrando imagenes

//llamando a listen 
server.listen();