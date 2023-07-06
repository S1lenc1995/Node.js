import { Post, CreatePost } from "../../types/posts.interface"


interface IPostsRepository {

    getAllPosts(): Promise<Post[]>;
    createPost (post: CreatePost): Promise<Post>
}

export default IPostsRepository