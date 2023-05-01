import { Service } from "typedi";
import FileDB, { Table } from "../../database/fileDB";
import { Post } from "../../types/posts.interface";

@Service()
class PostsRepository {
    private table = FileDB.getTable("posts");
    


    async getAllPosts() {
        return await this.table.getAll()
    }
    async getById(_id: number) {
        return await this.table.getById(_id)
    }

    async createdNewspost(newPost: Record<string, any>) {
        return await this.table.createdNewspost(newPost)
    }

    async updatedNewsposts(_id: number, { title, text, author }: { title?: string, text?: string, author?: string }) {
        return await this.table.updatedNewsposts(_id, { title, text, author })
    }

    async deleteById(_id: number): Promise<number | null> {
        return await this.table.deleteById(_id)
    }
}

export default PostsRepository;