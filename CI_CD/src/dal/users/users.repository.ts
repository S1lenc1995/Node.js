import { Service } from "typedi";
import { postsRegister } from "../../registerShema/postsRegisterShema";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";
import  {PostEntity}  from "../entity/post";
import { getManager } from "typeorm";
import { usersRegister } from "../../registerShema/usersRegisterShema";
import  {UserEntity}  from "../entity/user";
import { AppDataSource } from "../../dal/appDataSource";


@Service()
class UsersRepository {
  manager;
  constructor() {
    this.manager = getManager()
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
