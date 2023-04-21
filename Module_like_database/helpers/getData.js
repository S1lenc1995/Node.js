const path = require("path");
const fsp = require("fs/promises");

async function getData (dirname, nameDB){
    const pathDB = path.join(dirname, `${nameDB}.json`)
    const database = await fsp.readFile(pathDB, "utf-8")
    return JSON.parse(database)
  }

  module.exports = {
    getData: getData
  };