import "reflect-metadata"
import { DataSource } from "typeorm"


export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgres://twcfnlcu:wKNKUwuZcCQkBzFgWb_bIjlotTqVf6Vw@snuffleupagus.db.elephantsql.com/twcfnlcu",
    synchronize: true,
    logging: false,
})




