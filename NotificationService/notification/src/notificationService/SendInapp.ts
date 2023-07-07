import { notificationChanel } from "../helpers/decorator";
import { createTransport } from "nodemailer";

export class SendInapp {
    posts
    constructor(users, posts) {
        this.posts = posts
        this.sendNotification(users);
    }

    @notificationChanel('inapp')
    sendNotification(users) {
        console.log('SendInapp:', users);
        // Виконати логіку надсилання повідомлень в додатку для users з notificationChanel === 'inapp'
    }
}







