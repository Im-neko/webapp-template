"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
exports.router = router;
const user_controller_1 = require("../controllers/user.controller");
router.post("/", user_controller_1.postUser);
router.post("/login", user_controller_1.loginUser);
//# sourceMappingURL=user.routes.js.map