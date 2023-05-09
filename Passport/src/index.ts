import "reflect-metadata";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import { Container } from "typedi";
import AuthController from "./server/auth/auth.controller";
import FileDB from "./database/fileDB";


const app = new App(
  [Container.get(PostsController), Container.get(AuthController)],
  3000
);

app.listen();