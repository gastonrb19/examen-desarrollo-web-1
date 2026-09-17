import { Router } from "express";
import { DashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const dashboardController = new DashboardController();

// Require auth
router.use(authMiddleware);

router.get("/stats", dashboardController.getStats);

export default router;
