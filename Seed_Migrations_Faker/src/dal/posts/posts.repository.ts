import { Service } from "typedi";
import { postsRegister } from "../../registerShema/postsRegisterShema";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";
import { PostEntity } from "../entity/post";
import { getManager } from "typeorm";



@Service()
export class PostsRepository {
    manager;
    constructor() {
        this.manager = getManager()
    }
    async getAllPosts(params: Params): Promise<PagedPosts> {
        const queryBuilder = this.manager.createQueryBuilder("post", "p");
        let result = await queryBuilder
            .innerJoinAndSelect("p.author", "a")
            .getMany();
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
        const queryBuilder = this.manager.createQueryBuilder("post", "p");
        console.log("+")
        let result = await queryBuilder
            .innerJoinAndSelect("p.author", "a")
            .where("p.id = :id", { id: _id })
            .getOne();
/*         const result = await this.manager.findOne(PostEntity, { where: { id: _id } }) 
        console.log(result, '111111')
            return await this.manager.findOne(PostEntity, { where: { id: _id } })  */
            console.log(result,_id, "--------------------")
         return result 
    }
    async createdNewspost(newPost: Post) {
        const res = await this.manager.create(PostEntity, newPost);
        await this.manager.insert(PostEntity, res)
        return res
    }
    async updatedNewsposts(_id: number, post) {
        const res = await this.manager.update(PostEntity, _id , post)
        return res
    }
    async deleteById(_id: number): Promise<number | null> {
        const result = await this.manager.delete(PostEntity, _id );
        return result
    }
}


