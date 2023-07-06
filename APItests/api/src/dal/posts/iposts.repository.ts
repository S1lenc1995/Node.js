import { Service } from "typedi";
import { Post, CreatePost } from "../../types/posts.interface";

/* @Service() */
interface IPostsRepository{
    getAllPosts(): Promise<Post[]>

    createdNewspost(post: CreatePost): Promise<Post>
}

export default IPostsRepository