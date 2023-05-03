import * as express from "express";
import FileDB, { Table } from "../../database/fileDB";
import { Service } from "typedi";
import PostsService from "../../bll/posts/posts.service";
import Params from "../../types/params.interface";
const fs = require('fs');
const fsp = require("fs/promises");
const path = require("path");

interface Post {
    id: number;
    createDate: Date;
    title: string;
    author: string;
    text: string;
}

@Service()
class PostsController {
    public router = express.Router();
 

    constructor(private postsService: PostsService) {
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
            const params = {
                size: request.query.size ? Number(request.query.size) : null,
                page: request.query.page ? Number(request.query.page) : null,
                filter: request.query.filter || {},
              };
              const pagedPosts = await this.postsService.getAllPosts(params);
              response.send(pagedPosts);
          
          
        } catch (error) {
            console.error(error);
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
            deleteNewsposts === null ? response.sendStatus(404) : response.send(deleteNewsposts)
        } catch (error) {
            console.error(error);
            response.sendStatus(500);
        }
    }
}

export default PostsController;
