const connection = require("./connection")
const args = process.argv.slice(2)

const params = {};

args.forEach(arg => {
    const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
    params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
});
console.log(params)
const { search } = params


const getOriginalValuesQuery = `SELECT * from videos WHERE title LIKE $1`;
const getOriginalValuesParams = [`%${search}%`];

connection.query(getOriginalValuesQuery, getOriginalValuesParams, (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows)
    connection.end()
})
