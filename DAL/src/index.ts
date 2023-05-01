import "reflect-metadata";
import App from "./server/app";
import PostsController from "./server/posts/posts.controller";
import express from "express";
import FileDb from "./database/fileDB";
import Container from "typedi";

const app = new App([Container.get(PostsController)], 3000);

app.listen();

