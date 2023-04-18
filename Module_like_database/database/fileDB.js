

const fs = require('fs');
const fsp = require("fs/promises");
const path = require("path");


const newsPostsCollection = {
  name: 'newsPosts',
  newsPosts: []
};



const newspostSchema = {
  title: String,
  text: String,
  author: String,
};

async function getTable() {
  try {
    const pathDB = path.join(__dirname, "list.json")

    const database = await fsp.readFile(pathDB, "utf-8")
    if (!'newsPosts' in database) {
      const jsonCollection = JSON.stringify(newsPostsCollection);
      await fsp.writeFile(pathDB, jsonCollection)
    } 
   


    
    const data = await fsp.readFile(pathDB, "utf-8");

    const allData = JSON.parse(data);
    console.log(allData, '1111111111')
    return {
      getAll: () => {
        return allData;
      },
      getById: (id) => {
        return allData.filter(({ id }) => id == id)
      },
      createdNewspost: async (newPost) => {
        const idNewPost = allData.length + 1
        newPost.id = idNewPost
        allData.push(newPost)
        console.log(allData)
        await fsp.writeFile(listDB, JSON.stringify(allData))
        return newPost
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

