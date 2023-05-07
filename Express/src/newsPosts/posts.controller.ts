import * as express from "express";
import FileDB, { Table } from "../database/fileDB";
import { register } from "../registerShema/postsRegisterShema";



class PostsController {
    table: Table 
    public router = express.Router();

    constructor() {
        this.table = register()
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/api', this.getAll);
        this.router.get('/api/post/:id', this.getById);
        this.router.post('/api/createNewPost', this.createdNewspost);
        this.router.put('/api/editpost/:id', this.updatedNewsposts);
        this.router.delete('/api/delete/:id', this.deleteNewsposts);
    }

    getAll = async (request: express.Request, response: express.Response) => {
        try {
            const getAll = await  this.table.getAll()
            response.send(getAll)
        } catch (error) {
            console.error(error);
            response.sendStatus(500);
        }

    }

    getById = async (request: express.Request, response: express.Response) =>{
        try {
            const getById = await this.table.getById(Number(request.params.id))
            getById === null ? response.sendStatus(404) : response.send(getById)
        } catch (error) {
            response.sendStatus(500);
        }

    }

    createdNewspost = async (request: express.Request, response: express.Response) => {
        try {
            const post = request.body
            const createdNewspost = await this.table.createdNewspost(post)
            createdNewspost === null ? response.sendStatus(404) : response.send(createdNewspost)
        } catch (error) {
            response.sendStatus(500);
        }
    }

    updatedNewsposts = async (request: express.Request, response: express.Response) => {
        try {
            const post = request.body
            const id = Number(request.params.id)
            const updatedNewsposts = await this.table.updatedNewsposts(id, post)
            updatedNewsposts === null ? response.sendStatus(404) : response.send(updatedNewsposts)
        } catch (error) {
            console.error(error);
            response.sendStatus(500);
        }

    }

     deleteNewsposts = async (request: express.Request, response: express.Response) => {
        try {
            const id = Number(request.params.id)
            const deleteNewsposts = await this.table.deleteById(id)
            deleteNewsposts === null ? response.sendStatus(404) : response.send(String(deleteNewsposts))
        } catch (error) {
            console.error(error);
            response.sendStatus(500);
        }

    }
}

export default PostsController;
