import PostsRepository from "../../dal/posts/posts.repository";
import { Service } from "typedi";

interface Post {
    id: number;
    createDate: Date;
    title: string;
    author: string;
    text: string;
}

@Service()
class PostsService {
   

    constructor(private postsRepository: PostsRepository){}

    async getAllPosts(): Promise<Post[]> {
        return await this.postsRepository.getAllPosts()
    }
    async getById(_id: number) {
        return await this.postsRepository.getById(_id)
    }

    async createdNewspost(newPost: Record<string, any>) {
        return await this.postsRepository.createdNewspost(newPost)
    }

    async updatedNewsposts(_id: number, { title, text, author }: { title?: string, text?: string, author?: string }) {
        return await this.postsRepository.updatedNewsposts(_id, { title, text, author })
    }

    async deleteById(_id: number): Promise<number | null> {
        return await this.postsRepository.deleteById(_id)
    }
}

export default PostsService