import { getManager } from "typeorm";
import { SendInapp } from "../../notificationService/notificationService";
import { SendEmail } from "../../notificationService/notificationService";

export class UserBuilder {
   
    manager;
    constructor() {
      this.manager = getManager();
    }
    async getUsersByNotification( newPost) {
      console.log('++++')
      const queryBuilder = this.manager.createQueryBuilder("user", "p");
      const result = await queryBuilder
        .where("p.notificationSent = :notificationSent", { notificationSent: true })
        .getMany();
      new SendInapp(result, newPost);
      new SendEmail(result, newPost);
    }
  }