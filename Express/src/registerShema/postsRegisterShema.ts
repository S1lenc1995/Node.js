import FileDB from "../database/fileDB";

const newspostSchema = {
    id: Number,
    title: String,
    text: String,
    author: String, 
    createDate: Date,
  };

export function register (){
    FileDB.registerSchema('posts',newspostSchema);
    const table = FileDB.getTable("posts");
    return table
} 