const fileDB = require("./database/fileDB");


const newspostSchema = {
  id: Number,
  title: String,
  text: String,
  author: String,
  createDate: Date,
};

fileDB.registerSchema("list", newspostSchema);


(async () => {
  const newspostTable = await fileDB.getTable("list"); // Повертає об'єкт із набором методів для роботи 

  const newsposts = await newspostTable.getAll(); // Повертає усі записи у базі у вигляді масиву

  const newspost = await newspostTable.getById(); // Повертає запис за вказаним id, якщо id не знайдено поверне помилку 

  const createdNewspost = await newspostTable.createdNewspost({
    title: 'У зоопарку Чернігова лисичка народила лисеня',
    author: 'A.BBBB',
    text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!"
  }); // Повертає новий пост, та записує його в базу даних, 
  //якщо новий пост не відповідає Schema видасть помилку (новий пост повинен обов'язково містити такі поля  title, author, text) 
  // id та createDate генеруються автоматично

  const updatedNewsposts = await newspostTable.updatedNewsposts(1, { title: "aaaa111", author: "111", text: "222", aaa: 'sdds' }) // Оновлює пост по заданому id
  // якщо пост не знайдено повертає помилку, якщо пост був знайдений то оновлює його, і повертає оновлений пост

  const deletedId = await newspostTable.deleteById()    // Видаляє пост по  заданому id та повертає id, якщо пост не зайдений поверне помилку, 


})()




