"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("./error.middleware");
const config_1 = require("../config");
const client_1 = require("../lib/client");
const auth_entity_1 = require("../entity/auth.entity");
const authenticationMiddlware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            throw next(new error_middleware_1.ErrorHandler("Unauthorized access denied", 401));
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!decodedUser) {
            throw next(new error_middleware_1.ErrorHandler("Unauthorized access denied", 401));
        }
        // Check if the user exist with this userId :-
        if (decodedUser.userRole === auth_entity_1.userType.ADMIN) {
            // Find in the admin Table :-
            const adminUser = await client_1.prisma.adminUser.findUnique({
                where: {
                    id: decodedUser.userId
                }
            });
            if (!adminUser) {
                throw next(new error_middleware_1.ErrorHandler("Unauthorized access denied", 401));
            }
        }
        else {
            // Find in the user Table :-
            const userDetails = await client_1.prisma.user.findUnique({
                where: {
                    id: decodedUser.userId
                }
            });
            if (!userDetails) {
                throw next(new error_middleware_1.ErrorHandler("Unauthorized access denied", 401));
            }
        }
        req.user = decodedUser;
        next();
    }
    catch (error) {
        throw error;
    }
};
exports.authenticationMiddlware = authenticationMiddlware;
