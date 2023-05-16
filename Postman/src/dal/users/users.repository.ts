import { User } from "../../types/users.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";
import { usersRegister } from "../../registerShema/usersRegisterShema";
import { NewUser } from "../../types/users.interface";

@Service()
class UsersRepository {
  private table = usersRegister()

  async createdNewUser(newPost: Record<string, any>) {
    return await this.table.creationData(newPost)
}

async getByEmail (email: string) {
  return await this.table.searchByField(email)
}

}

export default UsersRepository;
