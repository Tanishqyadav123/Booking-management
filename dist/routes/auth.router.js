"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/send-otp", auth_controller_1.sendOtp);
router.post("/verify-otp", auth_controller_1.verifyOtp);
router.post("/sign-up", auth_controller_1.signupUser);
router.post("/sign-in", auth_controller_1.signinUser);
router.get("/me", authentication_middleware_1.authenticationMiddlware, auth_controller_1.getMyProfile);
router.patch("/profile", authentication_middleware_1.authenticationMiddlware, auth_controller_1.updateUserProfile);
// Forgot Password Routes :-
router.post("/send-forgot-otp", auth_controller_1.sendOTPForgotPassword);
router.post("/set-new-password", auth_controller_1.setNewPassword);
exports.default = router;
