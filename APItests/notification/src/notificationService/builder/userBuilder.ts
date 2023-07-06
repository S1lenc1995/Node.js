import { getManager } from "typeorm";

export class UserBuilder {
    manager;
    notificationChannel;
    table;
    constructor(table: string, notificationChannel: string) {
        this.manager = getManager()
        this.table = table
        this.notificationChannel = notificationChannel
    }

    async getByNotification() {

        const queryBuilder = this.manager.createQueryBuilder(this.table, "p");
        const result = await queryBuilder
           /*  .innerJoinAndSelect("p.author", "a") */
            .where("p.notificationSent = :notificationSent", { notificationSent: true })
            .andWhere("p.notificationChannel = :notificationChannel", { notificationChannel: this.notificationChannel })
            .getMany();
        return result
    }
} 