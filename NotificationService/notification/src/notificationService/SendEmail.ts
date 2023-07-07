import { notificationChanel } from "../helpers/decorator";
import { createTransport } from "nodemailer";


export class SendEmail {
    post
    transporter;
    constructor(users, post) {
        this.post = post
        this.transporter = createTransport({
            service: "gmail",
            auth: {
                user: "bohdankletskyi@gmail.com",
                pass: "hymhlzxguexzyadc",
            },
        });
        this.sendNotification(users)
    }
    sendEmail(to) {
        const message = {
            from: "bohdankletskyi@gmail.com",
            to,
            subject: "New post",
            html: `<h1>${this.post.title}</h1>
                    <p>${this.post.content}</p>
                    <p>${this.post.genre}</p>
                    <p><a href="http://localhost:3001/post/${this.post.id}">Click here</a></p>`,
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(message, function (err, info) {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    }

    @notificationChanel('email')
    sendNotification(users) {
        users.forEach((el) => {
            this.sendEmail(el.email)   
        })
    }
}
