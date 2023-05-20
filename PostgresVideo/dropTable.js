const connection = require("./connection")

connection.query('DROP TABLE videos', (error, results)=>{
    if(error){
        throw error
    }
    console.log(results)
});
connection.end();