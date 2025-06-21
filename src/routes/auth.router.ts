import { getMyProfile, sendOtp, signinUser, signupUser, verifyOtp } from "../controllers/auth.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/sign-up", signupUser);
router.post("/sign-in", signinUser);
router.get("/me", authenticationMiddlware, getMyProfile);

export default router;
