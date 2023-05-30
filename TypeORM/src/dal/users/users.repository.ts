import { Service } from "typedi";
import { postsRegister } from "../../registerShema/postsRegisterShema";
import Params from "../../types/params.interface";
import { PagedPosts, Post } from "../../types/posts.interface";
import  {PostEntity}  from "../entity/post";
import { getManager } from "typeorm";
import { usersRegister } from "../../registerShema/usersRegisterShema";
import  UserEntity  from "../entity/user";


@Service()
class UsersRepository {
  manager;
  constructor() {
    this.manager = getManager()
  }
  async getByEmail(email: string) {
    const res = await this.manager.findOne(UserEntity, { email: email })
    return res
  }
  async createdNewUser(user: Record<string, any>) {
    const res = await this.manager.create(UserEntity, user);
    await this.manager.insert(UserEntity, res);
    return res;

  }



}

export default UsersRepository;
