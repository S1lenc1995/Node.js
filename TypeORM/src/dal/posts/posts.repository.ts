import { Service } from "typedi";
import { postsRegister } from "../../registerShema/postsRegisterShema";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";
import  {PostEntity}  from "../entity/post";
import { getManager } from "typeorm";



@Service()
export class PostsRepository {
    manager;
    constructor() {
        this.manager = getManager()
    }
    async getAllPosts(params: Params): Promise<PagedPosts> {
        let result = await this.manager.find(PostEntity)
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
    async getById(_id: number) {
        return await this.manager.findOne(_id)
    }
    async createdNewspost(newPost: Post) {
        const res = await this.manager.create(PostEntity, newPost);
        await this.manager.insert(PostEntity, res)
        return res
    }
    async updatedNewsposts(_id: number, post) {
        const res =  await this.manager.update(PostEntity, {id: _id } , post)
        return res
    }
    async deleteById(_id: number): Promise<number | null> {
        const result = await this.manager.delete(PostEntity, { id: _id });
        return result
    }
}

/* @Service()
class PostsRepository {
    private table = postsRegister()
    async getAllPosts(params: Params): Promise<PagedPosts> {
        let result = await this.table.getAll()
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
    async getById(_id: number) {
        return await this.table.searchByField(_id)
    }

    async createdNewspost(newPost: Post) {
        return await this.table.creationData(newPost)
    }

    async updatedNewsposts(_id: number, post) {
        return await this.table.updatedNewsposts(_id, post)
    }

    async deleteById(_id: number): Promise<number | null> {
        return await this.table.deleteById(_id)
    }
} */
