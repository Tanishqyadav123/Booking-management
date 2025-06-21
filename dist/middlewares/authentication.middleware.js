"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const config_1 = require("../config");
const authenticationMiddlware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw next(new error_middleware_1.ErrorHandler("Unauthorized access denied", 401));
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.user = decodedUser;
        next();
    }
    catch (error) {
        throw error;
    }
};
exports.authenticationMiddlware = authenticationMiddlware;
