import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./entity/user"
import { PostEntity } from "./entity/post"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "underwater",
    database: "newDB",
    entities: [UserEntity, PostEntity],
    synchronize: true,
    logging: false,
    migrations: [],
    /* seeds:[], */
})




