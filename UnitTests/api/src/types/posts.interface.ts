import { User } from "./users.interface";
export interface Post {
    author?: User | string
    content: string;
    title: string;
    id: number;
    createDate: Date;
}

export interface CreatePost {
    author: string;
    content: string;
    title: string;
    createDate?: Date;
}

export interface PagedPosts {
    result: Post[];
    total: number;
    size: number;
    page: number;
}
