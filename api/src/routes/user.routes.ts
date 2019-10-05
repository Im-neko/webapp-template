import { Router } from "express";
const router = Router();

import { postUser, loginUser } from "../controllers/user.controller";


router.post("/", postUser);

router.post("/login", loginUser);

export { router };
