import { getManager } from "typeorm";
import { createHmac } from "crypto";

import { User, IUser } from "../entities/User.entity";
import { UserAuth, IUserAuth } from "../entities/UserAuth.entity";
import { signJWT } from "../config/jwt";
import { HASH_SALT } from "../config/env";


interface ILoginInfo {
  email: string;
  password: string;
}

interface IRegisterUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}


export class UserService {

  async loginUser(loginInfo: ILoginInfo) {
    const sha512 = createHmac("sha512", HASH_SALT);
    sha512.update(loginInfo.password);
    const password = sha512.digest("hex");
    const userAuth = await UserAuth.findOne({ where: { email: loginInfo.email, password } });
    if (!userAuth) { throw [404, "user not found"]; }
    const user = await User.findOne({ where: { id: userAuth.user_id } });
    if (!user) { throw [404, "user not found"]; }
    return signJWT({...user});
  }

  async saveUser(userInfo: IRegisterUser) {
    const userAuth = await UserAuth.findOne({ where: { email: userInfo.email } });
    if (userAuth) { throw [400, "user already exist."]; }

    await getManager().transaction(async session => {

      const user = new User();
      user.first_name = userInfo.first_name;
      user.last_name = userInfo.last_name;
      const savedUser = await session.save(user);

      const user_id = savedUser.id;
      const userAuth = new UserAuth();
      userAuth.user_id = user_id;
      userAuth.email = userInfo.email;
      const sha512 = createHmac("sha512", HASH_SALT);
      sha512.update(userInfo.password);
      const password = sha512.digest("hex");
      userAuth.password = password;

      await session.save(userAuth);
    });
    return { email: userInfo.email };
  }
}
