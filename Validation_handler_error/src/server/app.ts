import express from "express";
import * as bodyParser from "body-parser";
import errorHandle from "./utils/errorHandle";
import { logRequest } from "./utils/logger";




class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandle();
  }

  private initializeMiddlewares() {
    this.app.use(express.static("public"));
/*     this.app.use(bodyFormDataMiddleware);
    this.app.use(fieldsToBody); */
    this.app.use(express.json());
/*     this.app.use(formidable()); */
    this.app.use(logRequest);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandle() {
    this.app.use(errorHandle);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
