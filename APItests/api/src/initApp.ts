import "reflect-metadata";
import { PostsRepository } from "./dal/posts/posts.repository";
import PostsService from "./bll/posts/posts.service";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import AuthController from "./server/auth/auth.controller";
import Container from "typedi";
import { createConnection } from "typeorm";
import { UserEntity } from "./dal/entity/user";
import { PostEntity } from "./dal/entity/post";
import { clearDB } from "./__tests__/e2e/helpers";
import { DataSource } from "typeorm"

const db_name = process.env.DB_NAME || "newDB";

async function createApp() {
  const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "underwater",
    database: db_name,
    entities: [UserEntity, PostEntity],
    synchronize: true,
  });

  console.log("Connected to " + db_name);
  await AppDataSource.initialize();
    const app = new App(
      [Container.get(PostsController), Container.get(AuthController)],
      3000
    );

     app.listen();


  return app;
}

export default createApp;
