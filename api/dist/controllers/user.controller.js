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
const user_service_1 = require("../services/user.service");
/**
 * POST /user
 * save user info.
 */
const postUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userService = new user_service_1.UserService();
        const user = yield userService.saveUser(req.body);
        res.status(200).json({ message: "success", data: {}, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.postUser = postUser;
/**
 * POST /user/login
 */
const loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userService = new user_service_1.UserService();
        const token = yield userService.loginUser(req.body);
        console.log(token);
        res.status(200).json({ message: "success", data: { token }, error: false });
    }
    catch (e) {
        console.error(e);
        res.status(e[0] || 500).json({ message: e[1] || "failed", data: {}, error: true });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map