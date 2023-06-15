import { UserBuilder } from "./builder/userBuilder"

export class NotificationService{
    users 
    constructor(){
        this.users = new UserBuilder("user", "email")
    }
   async sendNotification(newPost){

    const usersNotificanionTrue = await this.users.getByNotification()
    usersNotificanionTrue.forEach((user)=>{
        console.log(` Notification send to ${user.email} via ${user.notificationChannel}. Title is ${newPost.title}, content is ${newPost.content}`)
    })
   }
  
}
