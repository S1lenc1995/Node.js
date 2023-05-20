import * as express from "express";
import { Service } from "typedi";
import PostsService from "../../bll/posts/posts.service";
import addFormats from "ajv-formats";
import Ajv from "ajv"
import postsSchema from "./posts.schema";
import { AppError, ValidationError } from "../utils/customErrors";
import logger from "../utils/logger"

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
        this.router.get('/api/posts', this.getAll);
        this.router.get('/api/post/:id', this.getById);
        this.router.post('/api/createNewPost', this.createdNewspost);
        this.router.put('/api/editpost/:id', this.updatedNewsposts);
        this.router.delete('/api/delete/:id', this.deleteNewsposts);
    }

    getAll = async (request: express.Request, response: express.Response) => {
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
            getById === null ? response.sendStatus(404) : response.send(getById)
        } catch (error) {
            response.sendStatus(500);
        }

    }

    /*           createdNewspost = async (request: express.Request, response: express.Response) => {
                const post = request.body
                logger.info(post)
                const valid = this.postValidator(post)
                if (!valid) {
                    logger.warn({ValidationError: this.postValidator.errors.map((e) => e.message)})
                    response.status(400).json({
                        message: this.postValidator.errors.map((e) => e.message),
                        errors: this.postValidator.errors 
                    })
                    return
                }
                try {
                    const createdNewspost = await this.postsService.createdNewspost(post)
                    response.send(createdNewspost)
                } catch (error) {
                    logger.error({ message: error.message, stack: error.stack })
                    if (process.env.NODE_ENV === 'production') {
                      response.status(500).json({
                        message: error.message
                      })
                    } else {
                      response.status(500).json({
                        message: error.message,
                        stack: error.stack
                      })
                    }
                    return
                }
            }   */


    // Спосіб яким ми робили на уроці, не працює, падає нода писав Вам в телеграм


    createdNewspost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
            const post = request.body
            logger.info(post)
            const valid = this.postValidator(post)
            if (!valid) {
                console.log(this.postValidator.errors, 'as')
                throw new ValidationError({
                    message: this.postValidator.errors.map((e) => e.message),
                });
            }
            try {
                const createdPost = await this.postsService.createdNewspost(post);
                response.send(createdPost);
            } catch (e) {
                throw new AppError({ message: e.message });
            }
        } catch (error) {
            console.log('++++++')
            next(error)
        }

    };


    updatedNewsposts = async (request: express.Request, response: express.Response) => {
        const post = request.body

        const id = Number(request.params.id)
        logger.info(post)
        const valid = this.postValidator(post)
        if (!valid) {
            logger.warn({ ValidationError: this.postValidator.errors.map((e) => e.message) })
            response.status(400).json({
                message: this.postValidator.errors.map((e) => e.message),
                errors: this.postValidator.errors
            })
            return
        }
        try {
            const updatedNewsposts = await this.postsService.updatedNewsposts(id, post)
            response.send(updatedNewsposts)
        } catch (error) {
            logger.error({ message: error.message, stack: error.stack })
            if (process.env.NODE_ENV === 'production') {
                response.status(500).json({
                    message: error.message
                })
            } else {
                response.status(500).json({
                    message: error.message,
                    stack: error.stack
                })
            }
            return
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
