"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_router_1 = __importDefault(require("./admin.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const comedian_router_1 = __importDefault(require("./comedian.router"));
const location_router_1 = __importDefault(require("./location.router"));
const express_1 = require("express");
const viewer_router_1 = __importDefault(require("./viewer.router"));
const router = (0, express_1.Router)();
router.use("/auth", auth_router_1.default);
router.use("/viewer", viewer_router_1.default);
router.use("/comedian", comedian_router_1.default);
router.use("/admin", admin_router_1.default);
router.use("/location", location_router_1.default);
exports.default = router;
