import { createHmac } from "crypto";

import UserRepo from "../repos/user";
import { signJWT } from "../util/jwt";
const HASH_SALT = process.env.HASH_SALT;

interface IUser {
  id: number;
  email: string;
  password: string;
}


class UserService {
  static async loginUser(email:string, rawPassword: string) {
    const sha512 = createHmac("sha512", HASH_SALT);
    sha512.update(email);
    sha512.update(rawPassword);
    const password = sha512.digest("hex");
    const user: IUser = await UserRepo.findOne(email, password);
    console.log('user', user)
    return signJWT({id: user.id});
  }
}

export default UserService;
