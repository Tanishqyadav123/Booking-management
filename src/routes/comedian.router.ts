import { allMyEvents } from "../controllers/comedian.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import express from "express";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { userType } from "../entity/auth.entity";

const router = express.Router();

router.get("/events/my", authenticationMiddlware, roleGuard([userType.COMEDIAN]), allMyEvents);
router.post("/events", authenticationMiddlware, roleGuard([userType.COMEDIAN]), allMyEvents);

export default router;
