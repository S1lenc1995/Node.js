import { faker } from "@faker-js/faker";
import { PostEntity } from "../entity/post";
const genres = ["Politic", "Business", "Sport", "Other"];

class PostFactory {
  createEntity() {
    const post = new PostEntity();
    post.header = faker.lorem.words(5);
    post.content = faker.lorem.words(10);
    post.genre = genres[Math.floor(Math.random() * genres.length)];
    return post;
  }
}

export default new PostFactory();
