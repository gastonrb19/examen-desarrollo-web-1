import { Router } from "express";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import clientRoutes from "./clientRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/clients", clientRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
