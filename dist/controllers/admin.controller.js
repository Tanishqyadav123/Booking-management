"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSignIn = exports.adminSignUp = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const auth_repo_1 = require("../repo/auth.repo");
const auth_validation_1 = require("../validations/auth.validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_middleware_1 = require("../middlewares/error.middleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const response_handler_1 = require("../handlers/response.handler");
const adminSignUp = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.signUpUserSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        // Check if any email is already exist :-
        const isEmailExist = await (0, auth_repo_1.isAdminExistWithEmailOrPhoneService)({ email: data.email });
        if (isEmailExist) {
            throw next(new error_middleware_1.ErrorHandler("User already exist with this email address ", 400));
        }
        const isPhoneExist = await (0, auth_repo_1.isAdminExistWithEmailOrPhoneService)({ phoneNumber: data.phoneNumber });
        if (isPhoneExist) {
            throw next(new error_middleware_1.ErrorHandler("User already exist with this Phone Number ", 400));
        }
        // Hashing the password :-
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        // Create new Admin :-
        const newAdminUser = await (0, auth_repo_1.createNewUserService)({ ...data, password: hashedPassword });
        return (0, response_handler_1.responseHandler)(res, "New Admin Created SuccessFully", 201, newAdminUser);
    }
    catch (error) {
        throw error;
    }
};
exports.adminSignUp = adminSignUp;
const adminSignIn = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.signInUserSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        const { email, password } = data;
        // check email must exist :-
        const isEmailExist = await (0, auth_repo_1.isAdminExistWithEmailOrPhoneService)({ email });
        console.log("Is Email Exist ", isEmailExist);
        if (!isEmailExist) {
            throw next(new error_middleware_1.ErrorHandler("Invalid Credentails", 400));
        }
        // Check for Password :-
        const isMatch = await bcrypt_1.default.compare(password, isEmailExist.password);
        if (!isMatch) {
            throw next(new error_middleware_1.ErrorHandler("Invalid Credentails", 400));
        }
        // Generate the token with userId and userRole :-
        const token = jsonwebtoken_1.default.sign({ userId: isEmailExist.id, userRole: isEmailExist.userType }, config_1.JWT_SECRET, {
            expiresIn: "1d"
        });
        return (0, response_handler_1.responseHandler)(res, "Admin Login SuccessFully", 200, token);
    }
    catch (error) {
        throw error;
    }
};
exports.adminSignIn = adminSignIn;
