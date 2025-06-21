import { Router } from "express";
import { sendOtp, signinUser, signupUser, verifyOtp } from "../controllers/auth.controller";

const router = Router();

router.post('/send-otp' , sendOtp)
router.post('/verify-otp' , verifyOtp)
router.post('/sign-up' , signupUser)
router.post('/sign-in' , signinUser)

export default router;
