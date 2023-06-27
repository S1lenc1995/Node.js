import { UserBuilder } from "./builder/userBuilder"


class NotificationService {
    emailsUsers
    inAppUsers
    constructor() {
        this.emailsUsers = new UserBuilder("user", "email")
        this.inAppUsers = new UserBuilder("user", "inapp")
    }
    async sendNotificationByEmail(newPost) {
        const usersNotificanionTrue = await this.emailsUsers.getByNotification()
        usersNotificanionTrue.forEach((user) => {
            console.log(` Notification send to ${user.email} via ${user.notificationChannel}. Title is ${newPost.title}, content is ${newPost.content}`)
        })
    }

    async sendNotificationByInapp(newPost) {
        const usersNotificanionTrue = await this.inAppUsers.getByNotification()
        usersNotificanionTrue.forEach((user) => {
            console.log(` Notification send to via ${user.notificationChannel}. Title is ${newPost.title}, content is ${newPost.content}`)
        })
    }
}

export default NotificationService