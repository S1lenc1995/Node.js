const connection = require("./connection")
const tsp = new Date().toISOString();
const args = process.argv.slice(2); // Відкидаємо перші два елементи (шляхи до виконуваного файла і скрипта)

const params = {};

args.forEach(arg => {
    const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
    params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
});
console.log(params)
const { title, content } = params

connection.query(
    `INSERT INTO posts (Title, Content, PostDate) VALUES ('${title}', '${content}', '${tsp}');`,
    (error, result) => {
        if (error) {
            throw error;
        }
        console.log(result)
    }
)
connection.end();