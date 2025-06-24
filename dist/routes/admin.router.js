"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controller_1 = require("../controllers/admin.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/sign-up", admin_controller_1.adminSignUp);
router.post("/sign-in", admin_controller_1.adminSignIn);
exports.default = router;
