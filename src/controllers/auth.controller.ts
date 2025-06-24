/* eslint-disable @typescript-eslint/no-explicit-any */
// Controller for signup routes :-

import {
  createNewUserService,
  fetchUserProfileService,
  isPhoneNumberVerifiedService,
  isUserExistWithEmailOrPhoneService,
  markAsVerifiedService,
  phoneVerifiedForForgotService,
  updatedUserDetailsService,
  updatePasswordService,
  upsertVerificationCodeService,
  verifyOtpService
} from "../repo/auth.repo";
import {
  forgotPasswordOtpSchema,
  sendOtpSchema,
  setNewPasswordSchema,
  signInUserSchema,
  signUpUserSchema,
  updateUserProfileSchema,
  verifyOtpSchema
} from "../validations/auth.validation";
import { JWT_SECRET, NODE_ENV, TWILIO_PHONE_NUMBER } from "../config";
import { NextFunction, Request, Response } from "express";
import { userType, verificationCodeType } from "../entity/auth.entity";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../middlewares/error.middleware";
import { generateOtp } from "../utils/generate.otp";
import jwt from "jsonwebtoken";
import { responseHandler } from "../handlers/response.handler";
import { twilioClient } from "../config/twilio.config";

const sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = sendOtpSchema.safeParse(req.body);

    if (!success) {
      return next(new ErrorHandler("Validation Failed", 400));
    }

    const { phoneNumber } = data;

    let otp = generateOtp();
    // Sending the SMS :-
    if (NODE_ENV === "production") {
      await twilioClient.messages.create({
        to: phoneNumber,
        from: TWILIO_PHONE_NUMBER,
        body: `This is your OTP : ${otp}`
      });
    } else {
      otp = "1234";
    }

    const currentDate = new Date();
    const expiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + 2)).toISOString(); // Setting the expiry for 2 min :-

    // Make an entry in the verification code table :-
    await upsertVerificationCodeService({ code: otp, phoneNumber, codeType: verificationCodeType.VERIFY, expiry });

    return responseHandler(res, "OTP Sent", 200);
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = verifyOtpSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { otp, codeType, phoneNumber } = data;

    // finding the verification code entry :-
    const isValidOtp = await verifyOtpService({ code: otp, codeType, phoneNumber });

    if (!isValidOtp) {
      throw next(new ErrorHandler("Otp is invalid or expired", 400));
    }

    // Update the entry :-
    const isUpdated = await markAsVerifiedService({ phoneNumber, codeType });

    if (!isUpdated) {
      throw next(new ErrorHandler("Entry could not updated successfully", 417));
    }

    return responseHandler(res, "Phone Number verified!!", 200);
  } catch (error) {
    throw error;
  }
};

// ONLY FOR COMEDIANS AND VIEWERS :-
const signupUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signUpUserSchema.safeParse(req.body);
    if (!success) {
      throw next(new ErrorHandler("Invalid Error : ", 400));
    }

    const { email, password, phoneNumber } = data;

    // Check first phone Number is verified or  not :-
    const isPhoneVerified = await isPhoneNumberVerifiedService({ phoneNumber });

    if (!isPhoneVerified) {
      throw next(new ErrorHandler("Phone number is not verified", 400));
    }

    // Check if the Phone number already not exist :-
    const isUserPhone = await isUserExistWithEmailOrPhoneService({ phoneNumber });

    if (isUserPhone) {
      throw next(new ErrorHandler("User already exist with this Phone number", 400));
    }
    // Check if the Email already not exist :-
    const isUserExist = await isUserExistWithEmailOrPhoneService({ email });

    if (isUserExist) {
      throw next(new ErrorHandler("User already exist with this email address", 400));
    }

    // Hashed the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createNewUserService({ ...data, password: hashedPassword });

    return responseHandler(res, `New ${userType} Created SuccessFully`, 201, newUser);
  } catch (error) {
    throw error;
  }
};

const signinUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signInUserSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { email, password } = data;

    // check email must exist :-
    const isEmailExist = await isUserExistWithEmailOrPhoneService({ email });

    if (!isEmailExist) {
      throw next(new ErrorHandler("Invalid Credentails", 400));
    }

    // Check for Password :-
    const isMatch = await bcrypt.compare(password, isEmailExist.password);

    if (!isMatch) {
      throw next(new ErrorHandler("Invalid Credentails", 400));
    }

    // Generate the token with userId and userRole :-
    const token = jwt.sign({ userId: isEmailExist.id, userRole: isEmailExist.userType }, JWT_SECRET!, {
      expiresIn: "1d"
    });

    return responseHandler(res, "LoggedIn SuccessFully", 200, { token });
  } catch (error) {
    throw error;
  }
};

const getMyProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, userRole } = req.user!;

    console.log(userId, userRole, "Printing the userRole and UserType");

    // Fetch user Profile Details using userId and userRole :-
    const profileDetails = await fetchUserProfileService({ userId });

    return responseHandler(res, "User's Profile Details ", 201, profileDetails);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;

    const { success, data } = updateUserProfileSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { firstName, lastName } = data;

    const userDetailsToUpdate = await fetchUserProfileService({ userId });

    if (!userDetailsToUpdate) {
      throw next(new ErrorHandler("User details not found", 404));
    }

    const dataToUpdate = {
      firstName: firstName ? firstName : userDetailsToUpdate.firstName,
      lastName: lastName ? lastName : userDetailsToUpdate.lastName
    };
    const updatedUserProfile = await updatedUserDetailsService({ userId, data: dataToUpdate });

    return responseHandler(res, "Profile Updated SuccessFully", 200, updatedUserProfile);
  } catch (error) {
    throw error;
  }
};

// Controller for forgot-password :-
const sendOTPForgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = forgotPasswordOtpSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { phoneNumber } = data;

    // Check phone number exist or not :-
    const isPhoneExist = await isUserExistWithEmailOrPhoneService({ phoneNumber });

    if (!isPhoneExist) {
      throw next(new ErrorHandler("User does not exist with this phone Number", 404));
    }

    // Send OTP on phone number :-
    let otp = generateOtp();

    if (NODE_ENV === "production") {
      // Use Twilio Service :-
      twilioClient.messages.create({
        to: phoneNumber,
        from: TWILIO_PHONE_NUMBER,
        body: `Your Forgot Password OTP is ${otp}`
      });
    } else {
      otp = "1234";
    }

    // Expiry :-
    const currentDate = new Date();
    const expiry = new Date(currentDate.setMinutes(currentDate.getMinutes() + 2)).toISOString();

    // Make an entry in the DB :-
    await upsertVerificationCodeService({ code: otp, codeType: verificationCodeType.FORGOT, phoneNumber, expiry });

    return responseHandler(res, "Otp Sent for forgot Password", 200);
  } catch (error) {
    throw error;
  }
};

const setNewPassword = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = setNewPasswordSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { password, phoneNumber } = data;

    // Check for this phoneNumber , user have verified the otp for forgot Password :-
    const isVerified = await phoneVerifiedForForgotService({ phoneNumber });

    if (!isVerified) {
      throw next(new ErrorHandler("Forgot Password OTP is not verified", 400));
    }

    // Hash the new Password :-
    const hashedPassword = await bcrypt.hash(password, 10);

    // Updating the Password :-
    await updatePasswordService({ password: hashedPassword, phoneNumber });

    return responseHandler(res, "Password Updated successFully", 200);
  } catch (error) {
    throw error;
  }
};

export { sendOtp, verifyOtp, signupUser, signinUser, getMyProfile, sendOTPForgotPassword, setNewPassword };
