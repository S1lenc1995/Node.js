import { Server } from "socket.io";
class SocketService {
  private io;
  private inited = false;
  private userSockets = {};

  init = (server) => {
    this.inited = true;
    this.io = new Server(server);
    this.io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("attach", ({ userId }) => {
        console.log("a user attached with id:" + userId);
        socket.userId = userId;
        this.userSockets[userId] = socket;
      });
      socket.on("disconnect", () => {
        this.userSockets[socket.userId] = null;
        console.log("user disconnected");
      });
    });
  };
  emit = (userId, event, data) => {
    if (!this.inited) {
      return console.error("Socker server was not inited!");
    }
    this.userSockets[userId].emit(event, data);
  };
  emitAll = (event, data) => {
    if (!this.inited) {
      return console.error("Socker server was not inited!");
    }
    this.io.emit(event, data);
  };
}

export default new SocketService();
