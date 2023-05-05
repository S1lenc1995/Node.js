export interface Post {
    author: string;
    content: string;
    title: string;
    id: number;
    date: Date;
}

export interface CreatePost {
    author: string;
    content: string;
    title: string;
}

export interface PagedPosts {
    result: Post[];
    total: number;
    size: number;
    page: number;
}
