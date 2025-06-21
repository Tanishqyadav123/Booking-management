"use strict";
// Controller for signup routes :-
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUser = exports.verifyOtp = exports.sendOtp = void 0;
const twilio_config_1 = require("../config/twilio.config");
const config_1 = require("../config");
const generate_otp_1 = require("../utils/generate.otp");
const auth_validation_1 = require("../validations/auth.validation");
const error_middleware_1 = require("../middlewares/error.middleware");
const auth_repo_1 = require("../repo/auth.repo");
const auth_entity_1 = require("../entity/auth.entity");
const response_handler_1 = require("../handlers/response.handler");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendOtp = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.sendOtpSchema.safeParse(req.body);
        if (!success) {
            return next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        const { phoneNumber } = data;
        let otp = (0, generate_otp_1.generateOtp)();
        // Sending the SMS :-
        if (config_1.NODE_ENV === "production") {
            await twilio_config_1.twilioClient.messages.create({
                to: phoneNumber,
                from: config_1.TWILIO_PHONE_NUMBER,
                body: `This is your OTP : ${otp}`
            });
        }
        else {
            otp = "1234";
        }
        const currentDate = new Date();
        const expiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + 2)).toISOString(); // Setting the expiry for 2 min :-
        // Make an entry in the verification code table :-
        await (0, auth_repo_1.upsertVerificationCodeService)({ code: otp, phoneNumber, codeType: auth_entity_1.verificationCodeType.VERIFY, expiry });
        return (0, response_handler_1.responseHandler)(res, "OTP Sent", 200);
    }
    catch (error) {
        throw error;
    }
};
exports.sendOtp = sendOtp;
const verifyOtp = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.verifyOtpSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        const { otp, codeType, phoneNumber } = data;
        // finding the verification code entry :-
        const isValidOtp = await (0, auth_repo_1.verifyOtpService)({ code: otp, codeType, phoneNumber });
        if (!isValidOtp) {
            throw next(new error_middleware_1.ErrorHandler("Otp is invalid or expired", 400));
        }
        // Update the entry :-
        const isUpdated = await (0, auth_repo_1.markAsVerifiedService)({ phoneNumber, codeType });
        if (!isUpdated) {
            throw next(new error_middleware_1.ErrorHandler("Entry could not updated successfully", 417));
        }
        return (0, response_handler_1.responseHandler)(res, "Phone Number verified!!", 200);
    }
    catch (error) {
        throw error;
    }
};
exports.verifyOtp = verifyOtp;
// ONLY FOR COMEDIANS AND VIEWERS :-
const signupUser = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.signUpUserSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Invalid Error : ", 400));
        }
        const { email, password, phoneNumber } = data;
        // Check first phone Number is verified or  not :-
        const isPhoneVerified = await (0, auth_repo_1.isPhoneNumberVerifiedService)({ phoneNumber });
        if (!isPhoneVerified) {
            throw next(new error_middleware_1.ErrorHandler("Phone number is not verified", 400));
        }
        // Check if the Phone number already not exist :-
        const isUserPhone = await (0, auth_repo_1.isUserExistWithEmailOrPhoneService)({ phoneNumber });
        if (isUserPhone) {
            throw next(new error_middleware_1.ErrorHandler("User already exist with this Phone number", 400));
        }
        // Check if the Email already not exist :-
        const isUserExist = await (0, auth_repo_1.isUserExistWithEmailOrPhoneService)({ email });
        if (isUserExist) {
            throw next(new error_middleware_1.ErrorHandler("User already exist with this email address", 400));
        }
        // Hashed the Password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await (0, auth_repo_1.createNewUserService)({ ...data, password: hashedPassword });
        return (0, response_handler_1.responseHandler)(res, `New ${auth_entity_1.userType} Created SuccessFully`, 201, newUser);
    }
    catch (error) {
        throw error;
    }
};
exports.signupUser = signupUser;
const signinUser = async (req, res, next) => {
    try {
        const { success, data } = auth_validation_1.signInUserSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        const { email, password } = data;
        // check email must exist :-
        const isEmailExist = await (0, auth_repo_1.isUserExistWithEmailOrPhoneService)({ email });
        if (!isEmailExist) {
            throw next(new error_middleware_1.ErrorHandler("Invalid Credentails", 400));
        }
        // Check for Password :-
        const isMatch = await bcrypt_1.default.compare(password, isEmailExist.password);
        if (!isMatch) {
            throw next(new error_middleware_1.ErrorHandler("Invalid Credentails", 400));
        }
        // Generate the token with userId and userRole :-
    }
    catch (error) {
        throw error;
    }
};
