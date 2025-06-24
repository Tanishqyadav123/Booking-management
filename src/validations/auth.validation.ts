import { userType, verificationCodeType } from "../entity/auth.entity";
import { z } from "zod";

export const sendOtpSchema = z.object({
  phoneNumber: z.string().nonempty({ message: "Phone number is not provided" })
});
export const verifyOtpSchema = z.object({
  phoneNumber: z.string().nonempty({ message: "Phone number is not provided" }),
  otp: z.string().length(4, { message: "Otp must be of 4 digit" }),
  codeType: z.enum([verificationCodeType.FORGOT, verificationCodeType.VERIFY])
});

export const signUpUserSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is Required" }),
  lastName: z.string().nonempty({ message: "Last Name is Required" }),
  password: z.string().min(8, { message: "Password must of atleast 8 characters" }),
  email: z.string().email({ message: "Invalid Email format" }),
  phoneNumber: z.string().nonempty({ message: "Phone number is not provided" }),
  userType: z.enum([userType.COMEDIAN, userType.VIEWER, userType.ADMIN])
});
export const signInUserSchema = z.object({
  password: z.string().min(8, { message: "Password must of atleast 8 characters" }),
  email: z.string().email({ message: "Invalid Email format" })
});

export const updateUserProfileSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name can not be empty" }).optional(),
  lastName: z.string().nonempty({ message: "Last Name can not be empty" }).optional()
});
export const forgotPasswordOtpSchema = z.object({
  phoneNumber: z.string().nonempty({ message: "Phone number can not be empty" })
});

export const setNewPasswordSchema = z.object({
  phoneNumber: z.string().nonempty(),
  password: z.string().min(8, { message: "Password must be atleast 8 characters" })
});
