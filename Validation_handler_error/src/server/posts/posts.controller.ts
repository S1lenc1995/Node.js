import * as express from "express";
import { Service } from "typedi";
import PostsService from "../../bll/posts/posts.service";
import addFormats from "ajv-formats";
import Ajv from "ajv"
import postsSchema from "./posts.schema";

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

    createdNewspost = async (request: express.Request, response: express.Response) => {
        try {
            const post = request.body
            const valid = this.postValidator(post)
            console.log(post, 'aaaaa')
            if (!valid) {
                console.log("----")
                return response.send(this.postValidator.errors)
             /*    throw new ValidationError({
                  message: this.postValidator.errors.map((e) => e.message),
                }); */
            }
            const createdNewspost = await this.postsService.createdNewspost(post)
            createdNewspost === null ? response.sendStatus(404) : response.send(createdNewspost)
        } catch (error) {
            response.sendStatus(500);
        }
    }

    updatedNewsposts = async (request: express.Request, response: express.Response) => {
        try {
            const post = request.body
            const id = Number(request.params.id)
            const updatedNewsposts = await this.postsService.updatedNewsposts(id, post)
            updatedNewsposts === null ? response.sendStatus(404) : response.send(updatedNewsposts)
        } catch (error) {
            response.sendStatus(500);
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
