const fs = require('fs');
const fsp = require("fs/promises");
const path = require("path");
/* const fileDB = require('jsonfile-promised'); */
const { getData } = require('../helpers/getData');


let shema = {}
let dbNameShema = ''

const registerSchema = function (nameShema, newspostSchema) {
  shema = {...newspostSchema}
  dbNameShema = nameShema;
}

 async function getTable(nameDB) {
  try {
    let pathDB = path.join(__dirname, "list.json")
    if (!fs.existsSync(pathDB)) {
      const jsonCollection = JSON.stringify([]);
      await fsp.writeFile(pathDB, jsonCollection) 
    }
    return {
      getAll: async () => {
        return await getData(__dirname, nameDB)
      },
      getById: async (_id) => {
        const parsedData = await getData(__dirname, nameDB)
        const search = parsedData.filter(({ id }) => id == _id)
        if(search.length === 0){
          throw new Error("The post was not found for the given id")
        }
        return search
      },
      createdNewspost: async (newPost) => {
        let parsedData = await  getData(__dirname, nameDB)
        const idNewPost =  parsedData.length + 1
        const now = new Date();
        newPost.id = idNewPost
        newPost.createDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());
        const shemaKeys =  Object.keys(shema).sort() 
        const newPostKeys = Object.keys(newPost).sort()
        if(JSON.stringify(shemaKeys) === JSON.stringify(newPostKeys)){
          parsedData.push(newPost);
          await fsp.writeFile(pathDB, JSON.stringify(parsedData))
          return newPost
        } else{
          throw new Error("Enter corect post")
        }
      },
      updatedNewsposts: async (_id, { title, text, author }) => {
        let parsedData = await getData(__dirname, nameDB)
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
        let parsedData = await getData(__dirname, nameDB)
        const newData = parsedData.filter(({ id }) => id !== _id)
        if(newData.length == parsedData.length){
          throw new Error("The post was not found for the given id")
        }
        await fsp.writeFile(pathDB, JSON.stringify(newData))
        return _id
      },
    
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getTable: getTable,
  registerSchema: registerSchema,
};

