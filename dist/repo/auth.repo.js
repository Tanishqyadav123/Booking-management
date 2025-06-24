"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordService = exports.phoneVerifiedForForgotService = exports.updatedUserDetailsService = exports.fetchUserProfileService = exports.createNewUserService = exports.isAdminExistWithEmailOrPhoneService = exports.isUserExistWithEmailOrPhoneService = exports.isPhoneNumberVerifiedService = exports.markAsVerifiedService = exports.verifyOtpService = exports.upsertVerificationCodeService = void 0;
const client_1 = require("../lib/client");
const auth_entity_1 = require("../entity/auth.entity");
const upsertVerificationCodeService = async ({ code, codeType, phoneNumber, expiry }) => {
    await client_1.prisma.verificationCode.upsert({
        where: {
            phoneNumber
        },
        update: {
            code,
            codeType,
            isVerified: false,
            expiry: expiry
        },
        create: {
            phoneNumber,
            code,
            codeType,
            expiry: expiry,
            isVerified: false
        }
    });
};
exports.upsertVerificationCodeService = upsertVerificationCodeService;
const verifyOtpService = async ({ code, codeType, phoneNumber }) => await client_1.prisma.verificationCode.findFirst({
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
exports.verifyOtpService = verifyOtpService;
const markAsVerifiedService = async ({ phoneNumber, codeType }) => await client_1.prisma.verificationCode.update({
    where: {
        phoneNumber,
        codeType
    },
    data: {
        isVerified: true,
        code: ""
    }
});
exports.markAsVerifiedService = markAsVerifiedService;
const isPhoneNumberVerifiedService = async ({ phoneNumber }) => await client_1.prisma.verificationCode.findFirst({
    where: {
        phoneNumber,
        isVerified: true
    }
});
exports.isPhoneNumberVerifiedService = isPhoneNumberVerifiedService;
const isUserExistWithEmailOrPhoneService = async ({ email, phoneNumber }) => await client_1.prisma.user.findFirst({
    where: {
        OR: [{ email }, { phoneNumber }]
    }
});
exports.isUserExistWithEmailOrPhoneService = isUserExistWithEmailOrPhoneService;
const isAdminExistWithEmailOrPhoneService = async ({ email, phoneNumber }) => await client_1.prisma.adminUser.findFirst({
    where: {
        OR: [{ email }, { phoneNumber }]
    }
});
exports.isAdminExistWithEmailOrPhoneService = isAdminExistWithEmailOrPhoneService;
const createNewUserService = async (createNewUserDetails) => {
    if (createNewUserDetails.userType === auth_entity_1.userType.ADMIN) {
        return await client_1.prisma.adminUser.create({
            data: {
                ...createNewUserDetails
            }
        });
    }
    return await client_1.prisma.user.create({
        data: {
            ...createNewUserDetails
        }
    });
};
exports.createNewUserService = createNewUserService;
const fetchUserProfileService = async ({ userId }) => await client_1.prisma.user.findUnique({
    where: {
        id: userId
    }
});
exports.fetchUserProfileService = fetchUserProfileService;
const updatedUserDetailsService = async ({ userId, data }) => await client_1.prisma.user.update({
    where: {
        id: userId
    },
    data: {
        ...data
    }
});
exports.updatedUserDetailsService = updatedUserDetailsService;
const phoneVerifiedForForgotService = async ({ phoneNumber }) => await client_1.prisma.verificationCode.findFirst({
    where: {
        phoneNumber,
        isVerified: true,
        codeType: "FORGOT",
        code: ""
    }
});
exports.phoneVerifiedForForgotService = phoneVerifiedForForgotService;
const updatePasswordService = async ({ password, phoneNumber }) => await client_1.prisma.user.update({
    where: {
        phoneNumber
    },
    data: {
        password
    }
});
exports.updatePasswordService = updatePasswordService;
