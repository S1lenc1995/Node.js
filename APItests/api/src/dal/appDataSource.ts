import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/user"
import { PostEntity } from "./entity/post"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://twcfnlcu:wKNKUwuZcCQkBzFgWb_bIjlotTqVf6Vw@snuffleupagus.db.elephantsql.com/twcfnlcu",
    entities: [UserEntity, PostEntity],
    synchronize: true,
    logging: false,
    migrations: ["build/dal/migrations/*.js"],
    /* seeds:[],  */
})




