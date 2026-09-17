import { Request, Response, NextFunction } from "express";
import { dryFn } from "../utils/dryFn";
import { ProductService } from "../services/productService";

const productService = new ProductService();

export class ProductController {
  findAll = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const products = await productService.findAll();
    res.status(200).json(products);
  });

  findOne = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const product = await productService.findOne(Number(req.params.id));
    res.status(200).json(product);
  });

  create = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await productService.create(req.body);
    res.status(201).json(newProduct);
  });

  update = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const updatedProduct = await productService.update(Number(req.params.id), req.body);
    res.status(200).json(updatedProduct);
  });

  delete = dryFn(async (req: Request, res: Response, next: NextFunction) => {
    const result = await productService.delete(Number(req.params.id));
    res.status(200).json(result);
  });
}
