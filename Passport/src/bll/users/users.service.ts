import UsersRepository from "../../dal/users/users.repository";
import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getUserByEmail = (email: string): User => {
    return this.usersRepository.getByEmail(email);
  };

  createAUser = (user: User) => {
    return this.usersRepository.createAUser(user);
  };
}

export default UsersService;
