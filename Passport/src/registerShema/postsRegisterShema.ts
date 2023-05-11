import FileDB from "../database/fileDB";

const newspostSchema = {
    id: Number,
    title: String,
    content: String,
    author: String, 
    createDate: Date,
    genre: String,
    isPrivate: Boolean,
  };

export function postsRegister (){
    FileDB.registerSchema('posts',newspostSchema);
    const table = FileDB.getTable("posts");
    return table
} 

