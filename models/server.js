const express = require('express'); 
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app = express() ;
        this.port = process.env.PORT;

        //Configuracion de http server
        this.server = http.createServer(this.app);

        //Configuracion de socket serve
        this.io = socketio( this.server, {/** Aqui pueden ir configuraciones adicionales */} );
    }

    middlewares() {
        this.app.use( express.static(path.resolve(__dirname, '../public')));
    }

    socketConfig() {
        new Sockets(this.io);
    }

    initServer() {
        
        this.middlewares();

        this.socketConfig();

        this.server.listen(this.port, () => {
            console.log('Servidor escuchando desde puerto ', this.port);
        });
    }
}

module.exports = Server;