import express from "express";
import * as bodyParser from "body-parser";
import * as swaggerUI from "swagger-ui-express"
import request from "supertest";
import jsonDoc from "./utils/swaggerGen/output";
import errorHandle from "./utils/errorHandle";
import { logRequest } from "./utils/logger";
import passportConfig from "./utils/passportConfig";
import cors from 'cors';
import SwaggerGenerate from "./utils/swaggerGen";

class App {
  public app: express.Application;
  public port: number;
  public server: any;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;
    this.app.use(cors());

    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
         res.setHeader('Access-Control-Allow-Credentials', 'true');   
      next();
    }); 
    
    this.initializeMiddlewares();
    passportConfig();
    this.initializeControllers(controllers);
    this.initializeSwager();
    this.initializeErrorHandle();
  }

  
private initializeSwager(){
  this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(jsonDoc, {explorer: true}))
}


  private initializeMiddlewares() {
    this.app.use(express.static("public"));
/*     this.app.use(bodyFormDataMiddleware);
    this.app.use(fieldsToBody); */
    this.app.use(express.json());
/*     this.app.use(formidable()); */
    this.app.use(logRequest);
  }

  private async initializeControllers(controllers) {
    const routers = []
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
      routers.push(controller.router)
    });
    await SwaggerGenerate(routers)
  }

  private initializeErrorHandle() {
    this.app.use(errorHandle);
  }

  
/*   public listen() {
    this.server = this.app.listen(this.port, (err?: Error) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Server started on port ${this.port}`);
      }
    });
  } */

  public listen() {
    this.server = this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

}

export default App;

