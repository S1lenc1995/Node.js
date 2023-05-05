import "reflect-metadata";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import { Container } from "typedi";
import FileDB from "./database/fileDB";

const newspostSchema = {
    id: Number,
    title: String,
    text: String,
    author: String, 
    createDate: Date,
  };

const app = new App([Container.get(PostsController)], 3000);
FileDB.registerSchema('posts', newspostSchema);
app.listen();

