import { notificationChanel } from "../helpers/decorator";
import { createTransport } from "nodemailer";
import SocketService from "../helpers/socketService";
import { io } from "socket.io-client";

export class SendInapp {
    posts
    constructor(users, posts) {
        this.posts = posts
        this.sendNotification(users);
    }

    @notificationChanel('inapp')
    sendNotification(users) {
        console.log('SendInapp:', users);
        const socket = io();
        users.forEach((user) => {
            socket.emit("attach", { userId: user.id })
        });
        SocketService.emitAll("message", this.posts)
    }
}







