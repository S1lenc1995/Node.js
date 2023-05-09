import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class UsersRepository {
  private users: User[] = [
    {
      id: 0,
      email: "bob@gmail.com",
      password: "$2a$10$fMwE1jZNQCpgAEZ7tPpv3ezdLd/Pa2UF2H3fjWbDeLxJJNbVHfdey",
    },
  ];

  getByEmail = (email: string) => {
    return this.users.find((user) => user.email === email);
  };

  createAUser = (user: User) => {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user;
  };
}

export default UsersRepository;
