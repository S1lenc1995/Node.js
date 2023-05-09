import UsersService from "../../bll/users/users.service";
import passport from "passport";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { Service } from "typedi";
import * as express from "express";
import { Post } from "../../types/posts.interface";
import { AppError, ValidationError } from "../utils/customErrors";
import logger from "../utils/logger";
//import { RequestWithUser } from "../../types/express.extention";
import { verifyToken } from "../middlewares/auth.middleware";
import auth from "../middlewares/auth.passport.middlewate";
import { Cookie } from "express-session";

@Service()
class AuthController {
  private privateKey = "QWE123";
  public path = "/auth";
  public router = express.Router();

  constructor(private usersService: UsersService) {
    // this.initializeValidators();
    this.initializeRoutes();
  }

  // public initializeValidators() {
  //   const ajv = new Ajv({ allErrors: true });
  //   addFormats(ajv);
  //   this.postValidator = ajv.compile(postsSchema);
  // }

  public initializeRoutes() {
    this.router.get("/privatetest", verifyToken, this.privateTest);
    this.router.post("/jwt/login", this.loginJWT);
    this.router.post("/jwt/register", this.registerJWT);
    this.router.post("/pass/login", auth.optional, this.loginPass);
    this.router.get("/pass/current", auth.required, this.privateTest);
  }

  privateTest = (request: express.Request, response: express.Response) => {
    response.send({
      message: "Hi from private route",
      user: request["auth"],
    });
  };

  loginPass = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.log('+++++')
    passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;

          user.token = jwt.sign(
            { user_id: user.id, email: user.email },
            "secret",
            {
              expiresIn: "2h",
            }
          );

          user.password = "";

          return response.json({ user });
        }

        return response.status(400).send(info);
      }
    )(request, response, next);
  };

  loginJWT = async (request: express.Request, response: express.Response) => {
    const { email, password } = request.body;

    const user = await this.usersService.getUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
        expiresIn: "2h",
      });

      user.password = "";
      user.token = token;
      response.cookie("token", token, { maxAge: 900000, httpOnly: true });
      return response.status(200).json(user);
    }
    response.status(400).send("Invalid Credentials");
  };

  registerJWT = async (
    request: express.Request,
    response: express.Response
  ) => {
    const { email, password } = request.body;
    const oldUser = this.usersService.getUserByEmail(email);
    if (oldUser) {
      return response.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.createAUser({
      id: 0,
      email: email,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
      expiresIn: "2h",
    });

    user.password = "";
    user.token = token;

    response.status(200).json(user);
  };
}

export default AuthController;
