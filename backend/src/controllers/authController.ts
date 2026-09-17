import { Request, Response, NextFunction } from "express";
import { dryFn } from "../utils/dryFn";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
  login = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  });
}
