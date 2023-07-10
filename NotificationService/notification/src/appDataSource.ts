import { createConnection, Connection } from "typeorm";
import { UserEntity } from "./entity/user";
import { PostEntity } from "./entity/post";
import "reflect-metadata"

export const AppDataSource = {
  async initialize() {
    const connection: Connection = await createConnection({
      type: "postgres",
      url: "postgres://twcfnlcu:wKNKUwuZcCQkBzFgWb_bIjlotTqVf6Vw@snuffleupagus.db.elephantsql.com/twcfnlcu",
      synchronize: true,
      logging: false,
      name: "default",
      entities: [UserEntity, PostEntity],
    });

    return connection;
  },
};


