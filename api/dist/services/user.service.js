"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const User_entity_1 = require("../entities/User.entity");
const UserAuth_entity_1 = require("../entities/UserAuth.entity");
const jwt_1 = require("../config/jwt");
class UserService {
    loginUser(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const sha512 = crypto_1.createHash("sha512");
            sha512.update(loginInfo.password);
            const password = sha512.digest("hex");
            const userAuth = yield UserAuth_entity_1.UserAuth.findOne({ where: { email: loginInfo.email, password } });
            if (!userAuth) {
                throw [404, "user not found"];
            }
            const user = yield User_entity_1.User.findOne({ where: { id: userAuth.user_id } });
            if (!user) {
                throw [404, "user not found"];
            }
            return jwt_1.signJWT(Object.assign({}, user));
        });
    }
    saveUser(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAuth = yield UserAuth_entity_1.UserAuth.findOne({ where: { email: userInfo.email } });
            if (userAuth) {
                throw [400, "user already exist."];
            }
            yield typeorm_1.getManager().transaction((session) => __awaiter(this, void 0, void 0, function* () {
                const user = new User_entity_1.User();
                user.first_name = userInfo.first_name;
                user.last_name = userInfo.last_name;
                const savedUser = yield session.save(user);
                const user_id = savedUser.id;
                const userAuth = new UserAuth_entity_1.UserAuth();
                userAuth.user_id = user_id;
                userAuth.email = userInfo.email;
                const sha512 = crypto_1.createHash("sha512");
                sha512.update(userInfo.password);
                const password = sha512.digest("hex");
                userAuth.password = password;
                yield session.save(userAuth);
            }));
            return { email: userInfo.email };
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map