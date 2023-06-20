import { faker } from "@faker-js/faker";
import { UserEntity } from "../entity/user";

class UserFactory {
  createEntity() {
    const user = new UserEntity();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
  }
}

export default new UserFactory();
