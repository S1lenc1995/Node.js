import express from "express";
import * as bodyParser from "body-parser";
import FileDB, { Table } from "../database/fileDB";


const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  author: String,
  createDate: Date,
};

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);

    // Додайте цей код
    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
       /*    res.setHeader('Access-Control-Allow-Credentials', true);  */
      next();
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    FileDB.registerSchema("posts", newspostSchema);
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;