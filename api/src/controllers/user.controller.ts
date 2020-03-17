import { Request, Response } from "express";
import UserService from "../services/user.service";


/**
 * POST /user
 * save user info.
 */
// const postUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userService = new UserService();
//     const user = await userService.saveUser(req.body);
//     res.status(200).json({message: "success", data: {}, error: false});
//   } catch (e) {
//     console.error(e);
//     res.status(e[0] || 500).json({message: e[1] || "failed", data: {}, error: true});
//   }
// };

/**
 * POST /user/login
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = await UserService.loginUser(req.body.email, req.body.password);
    res.status(200).json({message: "success", data: { token }, error: false});
  } catch (e) {
    console.error(e);
    res.status(e[0] || 500).json({message: e[1] || "failed", data: {}, error: true});
  }
};
