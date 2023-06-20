import { Service } from "typedi";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";
import  {PostEntity}  from "../entity/post";
import { getManager } from "typeorm";
import  {UserEntity}  from "../entity/user";
import { AppDataSource } from "../../dal/appDataSource";


@Service()
class UsersRepository {
  manager;
  constructor() {
    this.manager =AppDataSource.manager
  }
  async getByEmail(email: string) {
    const res = await this.manager.findOne(UserEntity, { where: { email: email } });
    return res;
  }
  async createdNewUser(user: Record<string, any>) {
    const newUser = this.manager.create(UserEntity, user);
    const res = await this.manager.save(newUser);
    return res;
  }
  async updatedUserData(email: string, seatings) {
    const res = await this.manager.update(UserEntity, { email: email }, seatings)
    return res
}
}
export default UsersRepository;
