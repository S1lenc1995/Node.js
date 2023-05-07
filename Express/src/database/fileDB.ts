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
        console.log(this.schemas, 'aaaa')
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

    async getAll(): Promise<Post[]> {
        const pathDB = path.join(__dirname, `${this.nameDB}.json`)
        const database = await fsp.readFile(pathDB, "utf-8")
        return JSON.parse(database)
    }

    async getById(_id: number): Promise<Post[] | null> {
        const parsedData = await this.getAll()
        const search = parsedData.filter(({ id }: { id: number }) => id == _id)
        if (search.length === 0) {
            return null
        }
        return search
    }

    async createdNewspost(newPost: Record<string, any>): Promise<Post | null> {
        let parsedData = await this.getAll()
        const idNewPost: number = parsedData.length + 1
        const now: Date = new Date();
        let createDate: Date = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());
        newPost.id = idNewPost
        newPost.createDate = createDate
        /*  let newObj = {...newPost, "id": idNewPost, "createDate": createDate  } */
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

    async updatedNewsposts(_id: number, { title, text, author }: { title?: string, text?: string, author?: string }): Promise<Post[] | null> {
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
            return null
        }
    }
    
    async deleteById(_id: number): Promise<number | null> {
        let parsedData = await this.getAll()
        const newData = parsedData.filter(({ id }) => id !== _id)
        if (newData.length == parsedData.length) {
            return null
        }
        await fsp.writeFile(this.pathDB, JSON.stringify(newData))
        return _id
    }
}

export default new FileDB();



