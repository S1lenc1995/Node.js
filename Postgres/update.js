const connection = require("./connection")
const args = process.argv.slice(2); // Відкидаємо перші два елементи (шляхи до виконуваного файла і скрипта)

const params = {};

args.forEach(arg => {
    const [key, value] = arg.split('='); // Розбиваємо аргумент на ключ і значення
    params[key.replace('--', '')] = value.replace(/'/g, ''); // Видаляємо подвійні лапки зі значень
});
console.log(params)
const { id, title, content } = params


connection.query(`UPDATE posts SET content=${checkValue(content)}, title=${checkValue(title)} WHERE id=${checkValue(id)}`, (error, results)=>{
    if(error){
        throw error
    }
    console.log(results.rows)
})
connection.end();


function checkValue(value) {
    return value !== undefined ? `'${value}'` : 'NULL';
}




