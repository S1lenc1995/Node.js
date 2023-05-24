const connection = require("./connection")
const args = process.argv.slice(2)

const params = {};

args.forEach(arg => {
    const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
    params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
  });
  console.log(params)
  const {page, size} = params
  const offset = (page-1) * size

const getOriginalValuesQuery = `SELECT * from videos LIMIT $2 OFFSET $1;`;
const getOriginalValuesParams = [offset, size];

connection.query(getOriginalValuesQuery, getOriginalValuesParams, (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows)
})
connection.end()
 