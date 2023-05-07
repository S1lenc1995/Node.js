import App from "./app";
import PostsController from "./newsPosts/posts.controller";
import express from "express";
import FileDb from "./database/fileDB";

const app = new App([new PostsController()], 3000);

app.listen();

