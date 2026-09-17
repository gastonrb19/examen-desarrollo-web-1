import { Request, Response, NextFunction } from "express";
import { dryFn } from "../utils/dryFn";
import { ClientService } from "../services/clientService";

const clientService = new ClientService();

export class ClientController {
  findAll = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const clients = await clientService.findAll();
    res.status(200).json(clients);
  });

  findOne = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const client = await clientService.findOne(Number(req.params.id));
    res.status(200).json(client);
  });

  create = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const newClient = await clientService.create(req.body);
    res.status(201).json(newClient);
  });

  update = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const updatedClient = await clientService.update(Number(req.params.id), req.body);
    res.status(200).json(updatedClient);
  });

  delete = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const result = await clientService.delete(Number(req.params.id));
    res.status(200).json(result);
  });
}
