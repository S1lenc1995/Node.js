import * as express from "express";
import { Service } from "typedi";
import PostsService from "../../bll/posts/posts.service";
import addFormats from "ajv-formats";
import Ajv from "ajv"
import postsSchema from "./posts.schema";
import { AppError, ValidationError } from "../utils/customErrors";
import logger from "../utils/logger"
import auth from "../../server/middlewares/auth.passport.middlewate";
import { KafkaClient, Producer } from "kafka-node";
/* import {NotificationService} from "../../bll/notificationService/notificationService"; */

const router = express.Router();
const client = new KafkaClient({ kafkaHost: "kafka:9092" });
const producer = new Producer(client);

producer.on("ready", function () {
  console.log("Kafka Producer is connected and ready.");
});

producer.on("error", function (error) {
  console.error("Kafka producer error:", error);
});




@Service()
class PostsController {
    public router = express.Router();
    private postValidator;



    constructor(private postsService: PostsService) {
        this.initializeValidators();
        this.intializeRoutes();
    }

    public initializeValidators() {
        const ajv = new Ajv({ allErrors: true });
        addFormats(ajv);
        this.postValidator = ajv.compile(postsSchema);
    }


    public intializeRoutes() {
        this.router.get('/api/posts',auth.required, this.getAll);
        this.router.get('/api/post/:id', auth.required, this.getById);
        this.router.post('/api/createNewPost', auth.required, this.createdNewspost);
        this.router.put('/api/editpost/:id', auth.required, this.updatedNewsposts);
        this.router.delete('/api/delete/:id', auth.required,  this.deleteNewsposts);
    }

    getAll = async (request: express.Request, response: express.Response) => {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        try {
            const params = {
                size: request.query.size ? Number(request.query.size) : null,
                page: request.query.page ? Number(request.query.page) : null,
                filter: request.query.filter || {},
            };
            const pagedPosts = await this.postsService.getAllPosts(params);
            response.send(pagedPosts);


        } catch (error) {
            response.sendStatus(500);
        }

    }

    getById = async (request: express.Request, response: express.Response) => {
        try {
            const getById = await this.postsService.getById(Number(request.params.id))
           //  getById === null ? response.sendStatus(404) : response.send(getById) 
            if (getById === null) {
                response.sendStatus(404);
              } else {
                response.send(getById);
              }
        } catch (error) {
            response.status(500).send(error);
        }
    }

    createdNewspost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("1")
        try {
            const post = request.body
        /*     logger.info(post) */
            const valid = this.postValidator(post)
            console.log("2")
            if (!valid) {
                console.log("3")
               /*  logger.warn({ ValidationError: this.postValidator.errors.map((e) => e.message) }) */
                throw new ValidationError({
                    message: this.postValidator.errors.map((e) => e.message),
                });
              
            }
            try {
                console.log("4")
                const createdNewspost = await this.postsService.createdNewspost({
                    ...post,
                    author: { ...request["auth"], id: request["auth"].user_id },
                    createDate: () => 'CURRENT_TIMESTAMP',
                })
                console.log("5")
                const buffer = Buffer.from(JSON.stringify(createdNewspost));
                console.log(buffer ,"6")
                producer.send(
                    [{ topic: "web-events-topic", messages: buffer, attributes: 1 }],
                    (err, data) => {
                    console.log(data);
                    }
                );

                response.send(createdNewspost)
               /*  const notification = new NotificationService
                notification.sendNotification(createdNewspost) */
             
            } catch (error) {
              /*   logger.error({ message: error.message, stack: error.stack }) */
                if (process.env.NODE_ENV === 'development') {
                    throw error; // помилка в режимі розробки
                } else {
                    throw new AppError({ message: error.message }); // повернути тільки повідомлення і код помилки в режимі продакшн
                }
            }
        } catch (error) {
            next(error)
        }
    }





    updatedNewsposts = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const post = request.body
            const id = Number(request.params.id)
            logger.info(post)
            const valid = this.postValidator(post)
            if (!valid) {
                logger.warn({ ValidationError: this.postValidator.errors.map((e) => e.message) })
                throw new ValidationError({
                    message: this.postValidator.errors.map((e) => e.message),
                });
            }
            try {
                const updatedNewsposts = await this.postsService.updatedNewsposts(id, post)
                response.send(updatedNewsposts)
            } catch (error) {
                logger.error({ message: error.message, stack: error.stack })
                if (process.env.NODE_ENV === 'development') {
                    throw error;
                } else {
                    throw new AppError({ message: error.message });
                }
            }
        } catch (error) {
            next(error)
        }
    }

    deleteNewsposts = async (request: express.Request, response: express.Response) => {
        try {
            const id = Number(request.params.id)
            const deleteNewsposts = await this.postsService.deleteById(id)
            deleteNewsposts === null ? response.sendStatus(404) : response.send(String(deleteNewsposts))
        } catch (error) {
            response.sendStatus(500);
        }
    }
}

export default PostsController;
