import {
  createNewUserType,
  markAsVerifiedType,
  updateUserProfileType,
  upsertVerificationCodeType
} from "../@types/auth.types";
import { prisma } from "../lib/client";
import { userType } from "../entity/auth.entity";

export const upsertVerificationCodeService = async ({
  code,
  codeType,
  phoneNumber,
  expiry
}: upsertVerificationCodeType) => {
  await prisma.verificationCode.upsert({
    where: {
      phoneNumber
    },
    update: {
      code,
      codeType,
      isVerified: false,
      expiry: expiry!
    },
    create: {
      phoneNumber,
      code,
      codeType,
      expiry: expiry!,
      isVerified: false
    }
  });
};

export const verifyOtpService = async ({ code, codeType, phoneNumber }: upsertVerificationCodeType) =>
  await prisma.verificationCode.findFirst({
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

export const markAsVerifiedService = async ({ phoneNumber, codeType }: markAsVerifiedType) =>
  await prisma.verificationCode.update({
    where: {
      phoneNumber,
      codeType
    },
    data: {
      isVerified: true,
      code: ""
    }
  });

export const isPhoneNumberVerifiedService = async ({ phoneNumber }: { phoneNumber: string }) =>
  await prisma.verificationCode.findFirst({
    where: {
      phoneNumber,
      isVerified: true
    }
  });

export const isUserExistWithEmailOrPhoneService = async ({
  email,
  phoneNumber
}: {
  email?: string;
  phoneNumber?: string;
}) =>
  await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }]
    }
  });
export const isAdminExistWithEmailOrPhoneService = async ({
  email,
  phoneNumber
}: {
  email?: string;
  phoneNumber?: string;
}) =>
  await prisma.adminUser.findFirst({
    where: {
      OR: [{ email }, { phoneNumber }]
    }
  });
export const createNewUserService = async (createNewUserDetails: createNewUserType) => {
  if (createNewUserDetails.userType === userType.ADMIN) {
    return await prisma.adminUser.create({
      data: {
        ...createNewUserDetails
      }
    });
  }

  return await prisma.user.create({
    data: {
      ...createNewUserDetails
    }
  });
};

export const fetchUserProfileService = async ({ userId }: { userId: string }) =>
  await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

export const updatedUserDetailsService = async ({ userId, data }: { userId: string; data: updateUserProfileType }) =>
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      ...data
    }
  });

export const phoneVerifiedForForgotService = async ({ phoneNumber }: { phoneNumber: string }) =>
  await prisma.verificationCode.findFirst({
    where: {
      phoneNumber,
      isVerified: true,
      codeType: "FORGOT",
      code: ""
    }
  });

export const updatePasswordService = async ({ password, phoneNumber }: { password: string; phoneNumber: string }) =>
  await prisma.user.update({
    where: {
      phoneNumber
    },
    data: {
      password
    }
  });
