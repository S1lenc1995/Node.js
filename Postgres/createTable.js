const connection = require("./connection")

connection.query(
    `CREATE TABLE posts (
        ID SERIAL PRIMARY KEY,
        Title VARCHAR(60),
        Content TEXT,
        PostDate TIMESTAMPTZ
    );`,
    (error, results) =>{
        if(error){
            throw error
        }
        console.log(results)
    }
);
connection.end();