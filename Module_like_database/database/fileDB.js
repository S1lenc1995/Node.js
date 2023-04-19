//const fileDB = require('file-db');
const fs = require('fs');
const fsp = require("fs/promises");
const path = require("path");


/* const newsPostsCollection = {
  name: 'newsPosts',
  newsPosts: []
}; */



const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  author: String,
  createDate: Date,
};

async function getTable() {
  try {
    let pathDB = path.join(__dirname, "list.json")
    if (!fs.existsSync(pathDB)) {
      const jsonCollection = JSON.stringify([]);
      await fsp.writeFile(pathDB, jsonCollection)
      //pathDB = path.join(__dirname, "list.json")
      //const db = await fileDB.connect(path.join(__dirname, 'list.json'))   Error fileDB.connect is not a function
      //db.registerSchema('newsPosts', newspostSchema);
    }
    const database = await fsp.readFile(pathDB, "utf-8")
    let parsedData = JSON.parse(database);

    return {
      getAll: () => {
        return parsedData;
      },
      getById: (_id) => {
        const search = parsedData.filter(({ id }) => id == _id)
        if(search.length === 0){
          throw new Error("The post was not found for the given id")
        }
        return search
      },
      createdNewspost: async (newPost) => {
        const idNewPost = parsedData.length + 1
        const now = new Date();
        newPost.id = idNewPost
        newPost.createDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());
        const shemaKeys = Object.keys(newspostSchema).sort()
        const newPostKeys = Object.keys(newPost).sort()
        console.log(shemaKeys, newPostKeys)
        if(JSON.stringify(shemaKeys) === JSON.stringify(newPostKeys)){
          parsedData.push(newPost);
          await fsp.writeFile(pathDB, JSON.stringify(parsedData))
          return newPost
        } else{
          throw new Error("Enter corect post")
        }
      },
      updatedNewsposts: async (_id, { title, text, author }) => {
        let flag = false
        const updateData = parsedData.map((obj) => {
          if (_id == obj.id) {
            flag = true
            title ? obj.title = title : null;
            text ? obj.text = text : null
            author ? obj.author = author : null
            return obj
          } else {
            return obj
          }
        })
        if(flag){
          await fsp.writeFile(pathDB, JSON.stringify(updateData))
          return updateData.filter(({ id }) => id == _id)
        } else{
          throw new Error("The post was not found for the given id")
        }
       
      },
      deleteById: async (_id) => {
        const newData = parsedData.filter(({ id }) => id !== _id)
        console.log(newData,parsedData )
        if(newData.length == parsedData.length){
          throw new Error("The post was not found for the given id")
        }
        await fsp.writeFile(pathDB, JSON.stringify(newData))
        return _id
      }
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getTable: getTable
};

