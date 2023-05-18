const connection = require("./connection")
const args = process.argv.slice(2); // Відкидаємо перші два елементи (шляхи до виконуваного файла і скрипта)



const params = {};

args.forEach(arg => {
  const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
  params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
});
console.log(params)
const {id, title, content} = params


const getOriginalValuesQuery = `SELECT content, title FROM posts WHERE id=$1`;
const getOriginalValuesParams = [id];

connection.query(getOriginalValuesQuery, getOriginalValuesParams, (error, results) => {
    if (error) {
        throw error;
    }
    if (results.rows.length === 0) {
        console.log("Запис з вказаним ID не знайдено.");
        return;
    }

    // Отримати початкові значення полів
    const originalContent = results.rows[0].content;
    const originalTitle = results.rows[0].title;

    // Визначити значення для оновлення полів
    const updatedContent = content !== undefined ? content : originalContent;
    const updatedTitle = title !== undefined ? title : originalTitle;

    const updateQuery = `UPDATE posts SET content=$1, title=$2 WHERE id=$3`;
    const updateParams = [updatedContent, updatedTitle, id];

    connection.query(updateQuery, updateParams, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        connection.end();
    });
});


