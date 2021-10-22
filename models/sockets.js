

class Sockets {
    
    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => { 

            socket.on('message-to-server', (data) => {
        
                this.io.emit('message-from-server', data);
            });
        
        });
        
    }
}

module.exports = Sockets;