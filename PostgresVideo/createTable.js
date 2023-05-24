const connection = require("./connection")

connection.query(
    `CREATE TABLE videos (
        ID SERIAL PRIMARY KEY,
        Title TEXT,
        Views FLOAT4,
        Category TEXT
    );`,
    (error, results) =>{
        if(error){
            throw error
        }
        console.log(results)
    }
);
connection.end();