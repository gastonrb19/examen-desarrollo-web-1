import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { validateDto } from "../middlewares/validate";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const productController = new ProductController();

// Public routes
router.get("/", productController.findAll);
router.get("/:id", productController.findOne);

// Protected routes
router.use(authMiddleware);
router.post("/", validateDto(CreateProductDto), productController.create);
router.put("/:id", validateDto(UpdateProductDto), productController.update);
router.delete("/:id", productController.delete);

export default router;
