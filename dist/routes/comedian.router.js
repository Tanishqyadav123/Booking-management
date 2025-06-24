"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comedian_controller_1 = require("../controllers/comedian.controller");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const express_1 = __importDefault(require("express"));
const roleGuard_middleware_1 = require("../middlewares/roleGuard.middleware");
const auth_entity_1 = require("../entity/auth.entity");
const router = express_1.default.Router();
router.get("/events/my", authentication_middleware_1.authenticationMiddlware, (0, roleGuard_middleware_1.roleGuard)([auth_entity_1.userType.COMEDIAN]), comedian_controller_1.allMyEvents);
router.post("/events", authentication_middleware_1.authenticationMiddlware, (0, roleGuard_middleware_1.roleGuard)([auth_entity_1.userType.COMEDIAN]), comedian_controller_1.allMyEvents);
exports.default = router;
