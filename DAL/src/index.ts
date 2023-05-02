import "reflect-metadata";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import { Container } from "typedi";

const app = new App([Container.get(PostsController)], 3000);

app.listen();

