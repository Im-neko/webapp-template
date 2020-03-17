import { Router } from "express";
const router = Router();

import { loginUser } from "../controllers/user.controller";


// router.post("/", postUser);

router.post("/login", loginUser);

export { router };
