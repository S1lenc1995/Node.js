const connection = require("./connection")
connection.query(
    `INSERT INTO videos ( Title, Views, Category) VALUES ('test title', '2323', 'test');`,
    (error, result) => {
        if(error){
            throw error;
        }
        console.log(result)
    }
)
connection.end();