const fs = require('fs');
const fsp = require("fs/promises");
const path = require("path");
import Params from "../types/params.interface";
import { PagedPosts, Post } from "../types/posts.interface";


class FileDB {
    private schemas: Record<string, any>;
    constructor() {
        this.schemas = {};
    }
    registerSchema(name: string, schema: any): void {
        this.schemas = { ...this.schemas, [name]: schema };
    }

    getTable(name: string): Table {
        /*    const schema = this.schemas[name]; */
        let pathDB = path.join(__dirname, `${name}.json`)
        if (!fs.existsSync(pathDB)) {
            fs.writeFileSync(pathDB, JSON.stringify([]))
        }
        return new Table(name, this.schemas.posts);
    }
}


export class Table {
    private nameDB: string;
    private shema: Record<string, any>;
    private pathDB: string;
    constructor(name: string, shema: Object) {
        this.nameDB = name
        this.shema = shema
        this.pathDB = path.join(__dirname, `${this.nameDB}.json`)
    }

    async getAll(params: Params): Promise<PagedPosts> {
        const database = await fsp.readFile(this.pathDB, "utf-8")
        let result = JSON.parse(database)
        if (params.size != null && params.page != null) {
            result = result.splice(params.page * params.size, params.size);
        }
        const total = result.length;
        return {
            total,
            result,
            size: params.size,
            page: params.page,
        }


    }

    async getById(_id: number): Promise<Post[] | null> {
        const database = await fsp.readFile(this.pathDB, "utf-8")
        let parsedData = JSON.parse(database)
        const search = parsedData.filter(({ id }) => id === _id)
        if (search.length === 0) {
            return null
        }
        return search
    }

    async createdNewspost(newPost: Record<string, any>): Promise<Post | null> {
        const database = await fsp.readFile(this.pathDB, "utf-8")
        let parsedData = JSON.parse(database)
        const idNewPost: number = parsedData.length + 1
        newPost.id = idNewPost
        newPost.createDate = new Date()
        const shemaKeys = Object.keys(this.shema).sort()
        const newPostKeys = Object.keys(newPost).sort()
        if (JSON.stringify(shemaKeys) === JSON.stringify(newPostKeys)) {
            parsedData.push(newPost as Post);
            await fsp.writeFile(this.pathDB, JSON.stringify(parsedData))
            return newPost as Post
        } else {
            return null
        }
    }

    async updatedNewsposts(_id: number, edditObj): Promise<Post[] | null> {
        const database = await fsp.readFile(this.pathDB, "utf-8")
        let parsedData = JSON.parse(database)
        let flag = false
        const updateData = parsedData.map((obj) => {
            if (_id == obj.id) {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key) && edditObj.hasOwnProperty(key)) {
                        obj[key] = edditObj[key];
                    }
                }
                flag = true
                return obj
            } else {
                return obj
            }
        })
        if (flag) {
            await fsp.writeFile(this.pathDB, JSON.stringify(updateData))
            return this.getById(_id)
        } else {
            return null
        }
    }

    async deleteById(_id: number): Promise<number | null> {
        const database = await fsp.readFile(this.pathDB, "utf-8")
        let parsedData = JSON.parse(database)
        const newData = parsedData.filter(({ id }) => id !== _id)
        if (newData.length == parsedData.length) {
            return null
        }
        await fsp.writeFile(this.pathDB, JSON.stringify(newData))
        return _id
    }
}

export default new FileDB();



