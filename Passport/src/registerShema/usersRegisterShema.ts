import FileDB from "../database/fileDB";

const usersSchema = {
    id: Number,
    createDate: Date,
    email: String,
    password: String
  };

export function usersRegister (){
    FileDB.registerSchema('users',usersSchema);
    const table = FileDB.getTable("users");
    return table
} 
