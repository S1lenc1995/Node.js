import UsersRepository from "../../dal/users/users.repository";
import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { NewUser } from "../../types/users.interface";

@Service()
class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createdNewspost(newPost: NewUser) {
    return await this.usersRepository.createdNewspost(newPost)
}
}

export default UsersService;
