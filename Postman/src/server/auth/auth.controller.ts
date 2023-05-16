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
import authSchema from "./auth.schema";

@Service()
class AuthController {
  private privateKey = "QWE123";
/*   public path = "/auth"; */
  public router = express.Router();
  private postValidator;

  constructor(private usersService: UsersService) {
    this.initializeValidators();
    this.initializeRoutes();
  }

  public initializeValidators() {
  const ajv = new Ajv({ allErrors: true });
  addFormats(ajv);
  this.postValidator = ajv.compile(authSchema);
}

  public initializeRoutes() {
    this.router.post("/auth/register", this.registerJWT);
    this.router.post("/auth/login", auth.optional, this.loginPass);
  }


  loginPass = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return response.status(400).send(err);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = jwt.sign(
            { user_id: user.id, email: user.email },
            "secret",
            {
              expiresIn: "12h",
            }
          );
          user.password = "";
          return response.json({ user });
        }

        return response.status(400).send(info);
      }
    )(request, response, next);
  };


  registerJWT = async (
    request: express.Request,
    response: express.Response
  ) => {
    console.log(request.body)
    const valid = this.postValidator(request.body)
    if(!valid){
      logger.warn({ValidationError: this.postValidator.errors.map((e) => e.message)})
      response.status(400).json({
          message: this.postValidator.errors.map((e) => e.message),
          errors: this.postValidator.errors 
      })
      return
    }
    const { email, password, confirmPassword } = request.body;
    const oldUser = await this.usersService.getByEmail(email);
    if (oldUser !== null  ) {
      return response.status(409).send("User Already Exist. Please Login");
    } 
    if (password !== confirmPassword) {
      return response.status(408).send("Password and Confirm password must be the same");
    } 

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email: email,
      password: encryptedPassword,
    }
  
    let user = await this.usersService.createdNewUser(newUser);

    const token = jwt.sign({ user_id: user.id, email }, this.privateKey, {
      expiresIn: "2h",
    }); 

    user.password = "";
    user.token = token; 

    response.status(200).send(user); 
  };
}

export default AuthController;
