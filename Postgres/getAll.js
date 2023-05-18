const connection = require("./connection")

connection.query(`SELECT * from posts;`, (error, results)=>{
    if(error){
        throw error
    }
    console.log(results.rows)
})

connection.end();