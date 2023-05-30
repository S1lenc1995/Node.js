import UsersRepository from "../../dal/users/users.repository";
import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { NewUser } from "../../types/users.interface";

@Service()
class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createdNewUser(newUser: Record<string, any>) {
    return await this.usersRepository.createdNewUser(newUser)
}

async getByEmail(email: string) {
  return await this.usersRepository.getByEmail(email)
}

}

export default UsersService;
