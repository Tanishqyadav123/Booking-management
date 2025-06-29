import { createNewSeatType, getAllSeatType } from "../controllers/seat.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { Router } from "express";
import { userType } from "../entity/auth.entity";

const router = Router();

router.get("/", authenticationMiddlware, roleGuard([userType.ADMIN]), getAllSeatType);
router.post("/", authenticationMiddlware, roleGuard([userType.ADMIN]), createNewSeatType);
export default router;
