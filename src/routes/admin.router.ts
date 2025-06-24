import { adminSignIn, adminSignUp } from "../controllers/admin.controller";
import { Router } from "express";

const router = Router();

router.post("/sign-up", adminSignUp);
router.post("/sign-in", adminSignIn);

export default router;
