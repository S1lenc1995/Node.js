import { PostsRepository } from "../../dal/posts/posts.repository";
import { Service } from "typedi";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";


@Service()
class PostsService {

    constructor(private postsRepository: PostsRepository) { }

    async getAllPosts(params: Params): Promise<PagedPosts> {
        return await this.postsRepository.getAllPosts(params)
    }
    async getById(_id: number) {
        return this.postsRepository.getById(_id)
    }

    async createdNewspost(newPost: Post) {
        return await this.postsRepository.createdNewspost(newPost)
    }

    async updatedNewsposts(_id: number, post) {
        return await this.postsRepository.updatedNewsposts(_id, post)
    }

    async deleteById(_id: number): Promise<number | null> {
        return await this.postsRepository.deleteById(_id)
    }
}

export default PostsService