const connection = require("./connection")
connection.query(
    `INSERT INTO videos ( Title, Views, Category) VALUES ('test title 8', 60, 'news');`,
    (error, result) => {
        if(error){
            throw error;
        }
        console.log(result.rows)
    }
)
connection.end();