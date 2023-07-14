import "reflect-metadata";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import { Container } from "typedi";
import AuthController from "./server/auth/auth.controller";
import FileDB from "./database/fileDB";
import { createConnection } from "typeorm";
import { UserBuilder } from "./bll/notificationService/builder/userBuilder";
import { AppDataSource } from "./dal/appDataSource";

 


createConnection().then( async() => {
  AppDataSource.initialize()
  const app = new App(
    [Container.get(PostsController), Container.get(AuthController)],
    3000
  );
  app.listen();
})

