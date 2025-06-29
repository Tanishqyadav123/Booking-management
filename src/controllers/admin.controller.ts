/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewUserService, isAdminExistWithEmailOrPhoneService } from "../repo/auth.repo";
import { NextFunction, Request, Response } from "express";
import { signInUserSchema, signUpUserSchema } from "../validations/auth.validation";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../middlewares/error.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { responseHandler } from "../handlers/response.handler";

const adminSignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signUpUserSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    // Check if any email is already exist :-
    const isEmailExist = await isAdminExistWithEmailOrPhoneService({ email: data.email });

    if (isEmailExist) {
      throw next(new ErrorHandler("User already exist with this email address ", 400));
    }

    const isPhoneExist = await isAdminExistWithEmailOrPhoneService({ phoneNumber: data.phoneNumber });

    if (isPhoneExist) {
      throw next(new ErrorHandler("User already exist with this Phone Number ", 400));
    }

    // Hashing the password :-
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new Admin :-
    const newAdminUser = await createNewUserService({ ...data, password: hashedPassword });

    return responseHandler(res, "New Admin Created SuccessFully", 201, newAdminUser);
  } catch (error) {
    throw error;
  }
};

const adminSignIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = signInUserSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { email, password } = data;
    // check email must exist :-
    const isEmailExist = await isAdminExistWithEmailOrPhoneService({ email });

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

    return responseHandler(res, "Admin Login SuccessFully", 200, token);
  } catch (error) {
    throw error;
  }
};

// Controllers
export { adminSignUp, adminSignIn };
