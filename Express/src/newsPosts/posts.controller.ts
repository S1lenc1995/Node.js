import * as express from "express";
import FileDB, { Table } from "../database/fileDB";
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

class PostsController {
   /*  table: Table */
    public router = express.Router();

    constructor() {
        //  this.table = FileDB.getTable("posts");  Коли звертаюсь до this.table в будь якому методі пише що це undefined
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get('/api', this.getAll);
        this.router.get('/api/:id', this.getById); 
    }

    async getAll(request: express.Request, response: express.Response) {
        const newspostTable = FileDB.getTable("posts");   // Чомусь не зміг це винести в конструктор
        const getAll = await newspostTable.getAll()
        response.send(getAll)
    }

    async getById(request: express.Request, response: express.Response){
        const newspostTable = FileDB.getTable("posts");
        const getById = await newspostTable.getById(Number(request.params.id))
        response.send(getById)
    }
    
    async createdNewspost(request: express.Request, response: express.Response){
        const newspostTable = FileDB.getTable("posts");
        const createdNewspost = await newspostTable.createdNewspost
    }
    
   /*  async updatedNewsposts(_id: number, { title, text, author }: { title?: string, text?: string, author?: string }): Promise<Post[]> {
        let parsedData = await this.getAll()
        let flag = false
        const updateData = parsedData.map((obj) => {
            if (_id == obj.id) {
                flag = true
                title ? obj.title = title : null;
                text ? obj.text = text : null
                author ? obj.author = author : null
                return obj
            } else {
                return obj
            }
        })
        if (flag) {
            await fsp.writeFile(this.pathDB, JSON.stringify(updateData))
            return this.getById(_id)
        } else {
            throw new Error("The post was not found for the given id")
        }
    }
    
    async deleteById(_id: number): Promise<number> {
        let parsedData = await this.getAll()
        const newData = parsedData.filter(({ id }) => id !== _id)
        if (newData.length == parsedData.length) {
            throw new Error("The post was not found for the given id")
        }
        await fsp.writeFile(this.pathDB, JSON.stringify(newData))
        return _id
    }  */
}

export default PostsController;
