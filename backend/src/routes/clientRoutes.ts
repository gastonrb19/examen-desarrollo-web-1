import { Router } from "express";
import { ClientController } from "../controllers/clientController";
import { validateDto } from "../middlewares/validate";
import { CreateClientDto, UpdateClientDto } from "../dtos/client.dto";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const clientController = new ClientController();

// Require auth for all client routes
router.use(authMiddleware);

router.get("/", clientController.findAll);
router.get("/:id", clientController.findOne);
router.post("/", validateDto(CreateClientDto), clientController.create);
router.put("/:id", validateDto(UpdateClientDto), clientController.update);
router.delete("/:id", clientController.delete);

export default router;
