import {
  getMyProfile,
  sendOtp,
  sendOTPForgotPassword,
  setNewPassword,
  signinUser,
  signupUser,
  updateUserProfile,
  verifyOtp
} from "../controllers/auth.controller";
import { authenticationMiddlware } from "../middlewares/authentication.middleware";
import { Router } from "express";

const router = Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/sign-up", signupUser);
router.post("/sign-in", signinUser);
router.get("/me", authenticationMiddlware, getMyProfile);
router.patch("/profile", authenticationMiddlware, updateUserProfile);
// Forgot Password Routes :-
router.post("/send-forgot-otp", sendOTPForgotPassword);
router.post("/set-new-password", setNewPassword);
export default router;
