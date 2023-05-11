import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { usersRegister } from "../../registerShema/usersRegisterShema";
import { NewUser } from "../../types/users.interface";

@Service()
class UsersRepository {
  private table = usersRegister()

  async createdNewspost(newPost: NewUser) {
    return await this.table.createdNewspost(newPost)
}

}

export default UsersRepository;
