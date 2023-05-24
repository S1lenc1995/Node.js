const connection = require("./connection")

connection.query(
    `SELECT Category, SUM(Views) as TotlaViews from videos GROUP BY Category;`,
    (error, results) =>{
        if(error){
            throw error;
        }
        console.log(results.rows);
    }
)
connection.end()