import { Request, Response, NextFunction } from "express";
import { dryFn } from "../utils/dryFn";
import { AppDataSource } from "../config/database";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Client } from "../models/Client";

export class DashboardController {
  getStats = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);
    const clientRepository = AppDataSource.getRepository(Client);

    const [usersCount, productsCount, clientsCount] = await Promise.all([
      userRepository.count(),
      productRepository.count(),
      clientRepository.count(),
    ]);

    res.status(200).json({
      usuarios: usersCount,
      productos: productsCount,
      clientes: clientsCount,
    });
  });
}
