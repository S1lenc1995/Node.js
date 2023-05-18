const connection = require("./connection")
const tsp = new Date().toISOString();
connection.query(
    `INSERT INTO posts (Title, Content, PostDate) VALUES ('test title 2', 'test content 2', '${tsp}');`,
    (error, result) => {
        if(error){
            throw error;
        }
        console.log(result)
    }
)
connection.end();