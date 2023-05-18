const connection = require("./connection");

connection.query(`SELECT * from posts WHERE id=1`, (error, results)=>{
    if(error){
        throw error;
    }
    console.log(results.rows)
})

connection.end();