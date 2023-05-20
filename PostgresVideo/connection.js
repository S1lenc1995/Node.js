const { Pool } = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "newDB",
    password: "underwater", 
    port: 5432, 
});

module.exports = pool