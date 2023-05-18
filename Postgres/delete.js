const connection = require("./connection");

connection.query(`DELETE FROM posts WHERE ID = 1;`, (error, results)=>{
    if(error){
        throw error;
    }
    console.log(results);
})
connection.end()