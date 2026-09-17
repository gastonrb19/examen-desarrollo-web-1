import { Request, Response, NextFunction } from "express";
import { dryFn } from "../utils/dryFn";
import { UserService } from "../services/userService";

const userService = new UserService();

export class UserController {
  findAll = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.findAll();
    res.status(200).json(users);
  });

  findOne = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.findOne(Number(req.params.id));
    res.status(200).json(user);
  });

  create = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  });

  update = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const updatedUser = await userService.update(Number(req.params.id), req.body);
    res.status(200).json(updatedUser);
  });

  delete = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.delete(Number(req.params.id));
    res.status(200).json(result);
  });
}
