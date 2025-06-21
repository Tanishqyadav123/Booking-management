"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUserService = exports.isUserExistWithEmailOrPhoneService = exports.isPhoneNumberVerifiedService = exports.markAsVerifiedService = exports.verifyOtpService = exports.upsertVerificationCodeService = void 0;
const client_1 = require("../lib/client");
const upsertVerificationCodeService = async ({ code, codeType, phoneNumber, expiry }) => {
    await client_1.prisma.verificationCode.upsert({
        where: {
            phoneNumber
        },
        update: {
            code,
            codeType,
            expiry: expiry
        },
        create: {
            phoneNumber,
            code,
            codeType,
            expiry: expiry
        }
    });
};
exports.upsertVerificationCodeService = upsertVerificationCodeService;
const verifyOtpService = async ({ code, codeType, phoneNumber }) => {
    return await client_1.prisma.verificationCode.findFirst({
        where: {
            phoneNumber,
            code,
            codeType,
            expiry: {
                gt: new Date().toISOString()
            },
            isVerified: false
        }
    });
};
exports.verifyOtpService = verifyOtpService;
const markAsVerifiedService = async ({ phoneNumber, codeType }) => {
    return await client_1.prisma.verificationCode.update({
        where: {
            phoneNumber,
            codeType
        },
        data: {
            isVerified: true,
            code: ""
        }
    });
};
exports.markAsVerifiedService = markAsVerifiedService;
const isPhoneNumberVerifiedService = async ({ phoneNumber }) => {
    return await client_1.prisma.verificationCode.findFirst({
        where: {
            phoneNumber,
            isVerified: true
        }
    });
};
exports.isPhoneNumberVerifiedService = isPhoneNumberVerifiedService;
const isUserExistWithEmailOrPhoneService = async ({ email, phoneNumber }) => {
    return await client_1.prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { phoneNumber }
            ]
        }
    });
};
exports.isUserExistWithEmailOrPhoneService = isUserExistWithEmailOrPhoneService;
const createNewUserService = async (createNewUserDetails) => {
    return await client_1.prisma.user.create({
        data: {
            ...createNewUserDetails,
        }
    });
};
exports.createNewUserService = createNewUserService;
