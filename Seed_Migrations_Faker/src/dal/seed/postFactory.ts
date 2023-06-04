import { faker } from "@faker-js/faker";
import { PostEntity } from "../entity/post";
const genres = ["Politic", "Business", "Sport", "Other"];
const isPrivate = [true, false]

class PostFactory {
  createEntity() {
    const post = new PostEntity();
    post.title = faker.lorem.words(5);
    post.content = faker.lorem.words(10);
    post.genre = genres[Math.floor(Math.random() * genres.length)];
    post.isPrivate = isPrivate[Math.floor(Math.random() * isPrivate.length)];
   /*  post.isPrivate = faker.random.arrayElement(isPrivate); */
    post.createDate = faker.date.recent();
    return post;
  }
}

export default new PostFactory();
