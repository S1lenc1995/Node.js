import {Server} from "socket.io"
class SocketService{
    private io;
    private inited = false;
    private useSockets = {};

    init = (server)=>{
        this.inited = true;
        this.io = new Server(server);
        this.io.on("connection", (socket)=>{
            console.log("a user connected");
            socket.on("attach",({userId})=>{
                console.log("a user attached this id:" + userId)
                this.useSockets[userId] = socket
            });
            socket.on("disconnect", ()=>{
                console.log("use disconnected")
            });
        });
    };
    emit = (userId, event, data) =>{
        if(!this.inited){
            return console.error("Socker server was not inited");
        }
        this.useSockets[userId].emit(event,data);
    }
    emitAll = (event, data) => {
        if(!this.inited){
            return console.error("Socker server was not inited");
        }
        this.io.emit(event, data);
    };
}

export default new SocketService()