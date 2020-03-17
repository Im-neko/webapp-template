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

  // async saveUser(userInfo: IRegisterUser) {
  //   const userAuth = await UserAuth.findOne({ where: { email: userInfo.email } });
  //   if (userAuth) { throw [400, "user already exist."]; }
  //
  //   await getManager().transaction(async session => {
  //
  //     const user = new User();
  //     user.first_name = userInfo.first_name;
  //     user.last_name = userInfo.last_name;
  //     const savedUser = await session.save(user);
  //
  //     const user_id = savedUser.id;
  //     const userAuth = new UserAuth();
  //     userAuth.user_id = user_id;
  //     userAuth.email = userInfo.email;
  //     const sha512 = createHmac("sha512", HASH_SALT);
  //     sha512.update(userInfo.password);
  //     const password = sha512.digest("hex");
  //     userAuth.password = password;
  //
  //     await session.save(userAuth);
  //   });
  //   return { email: userInfo.email };
  // }
}

export default UserService;
