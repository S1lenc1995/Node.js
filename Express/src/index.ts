/* import express from "express";
import FileDb from "./database/fileDB";
const app = express();

const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  author: String,
  createDate: Date,
};

FileDb.registerSchema("list", newspostSchema);
const newspostTable = FileDb.getTable("list");
 (async () => {
  const get = await newspostTable.getAll()

   const getById = await newspostTable.getById(2)

    const createdNewspost = await newspostTable.createdNewspost({
        title: 'У зоопарку Чернігова лисичка народила лисеня',
        author: 'Aaaaa.BBBB',
        text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!"
   });

 const updateData = await newspostTable.updatedNewsposts(2, { author: 'rrrrrrrrrrr' })
const deleteById = await newspostTable.deleteById(1)
}) () 


app.get("/", async (request, response) => {
  response.send( await newspostTable.getAll());
});

app.listen(3000); */

import App from "./app";
import PostsController from "./newsPosts/posts.controller";
import express from "express";
import FileDb from "./database/fileDB";




/* const newspostTable = FileDb.getTable("posts"); */

const app = new App([new PostsController()], 3000);

app.listen();

