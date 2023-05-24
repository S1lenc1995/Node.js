const connection = require("./connection")
const args = process.argv.slice(2)

const params = {};

args.forEach(arg => {
    const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
    params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
  });
  console.log(params)
  const {top} = params
 

const getOriginalValuesQuery = `SELECT Category, SUM(Views) as TotlaViews from videos GROUP BY Category ORDER BY SUM(Views) DESC LIMIT $1;`;
const getOriginalValuesParams = [top];

connection.query(getOriginalValuesQuery, getOriginalValuesParams, (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows)
})
connection.end()
 