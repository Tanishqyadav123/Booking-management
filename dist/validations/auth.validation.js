"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserSchema = exports.signUpUserSchema = exports.verifyOtpSchema = exports.sendOtpSchema = void 0;
const auth_entity_1 = require("../entity/auth.entity");
const zod_1 = require("zod");
exports.sendOtpSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string().nonempty({ message: "Phone number is not provided" })
});
exports.verifyOtpSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string().nonempty({ message: "Phone number is not provided" }),
    otp: zod_1.z.string().length(4, { message: "Otp must be of 4 digit" }),
    codeType: zod_1.z.enum([auth_entity_1.verificationCodeType.FORGOT, auth_entity_1.verificationCodeType.VERIFY])
});
exports.signUpUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().nonempty({ message: "First Name is Required" }),
    lastName: zod_1.z.string().nonempty({ message: "Last Name is Required" }),
    password: zod_1.z.string().min(8, { message: "Password must of atleast 8 characters" }),
    email: zod_1.z.string().email({ message: "Invalid Email format" }),
    phoneNumber: zod_1.z.string().nonempty({ message: "Phone number is not provided" }),
    userType: zod_1.z.enum([auth_entity_1.userType.COMEDIAN, auth_entity_1.userType.VIEWER])
});
exports.signInUserSchema = zod_1.z.object({
    password: zod_1.z.string().min(8, { message: "Password must of atleast 8 characters" }),
    email: zod_1.z.string().email({ message: "Invalid Email format" })
});
