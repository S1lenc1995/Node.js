import express from "express";
import http from "http";
import SocketService from "./helpers/socketService";

const app = express();
const server = http.createServer(app);

SocketService.init(server);

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});