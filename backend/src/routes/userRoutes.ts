import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateDto } from "../middlewares/validate";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const userController = new UserController();

// Public route to create a user (so we can login)
router.post("/", validateDto(CreateUserDto), userController.create);

// Require auth for the rest of user routes
router.use(authMiddleware);

router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", validateDto(UpdateUserDto), userController.update);
router.delete("/:id", userController.delete);

export default router;
