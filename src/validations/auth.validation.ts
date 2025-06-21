import {z} from 'zod';
import { userType, verificationCodeType } from '../entity/auth.entity';

export const sendOtpSchema = z.object({
     phoneNumber : z.string().nonempty({message : "Phone number is not provided"})
}) 
export const verifyOtpSchema = z.object({
     phoneNumber : z.string().nonempty({message : "Phone number is not provided"}),
     otp : z.string().length(4 , {message : "Otp must be of 4 digit"}),
     codeType : z.enum([verificationCodeType.FORGOT , verificationCodeType.VERIFY])
}) 

export const signUpUserSchema = z.object({
      firstName : z.string().nonempty({message : "First Name is Required"}),
      lastName : z.string().nonempty({message : "Last Name is Required"}),
      password : z.string().min(8 , {message : "Password must of atleast 8 characters"}),
      email : z.string().email({message : "Invalid Email format"}),
      phoneNumber : z.string().nonempty({message : "Phone number is not provided"}),
      userType : z.enum([userType.COMEDIAN, userType.VIEWER])
})
export const signInUserSchema = z.object({
     
      password : z.string().min(8 , {message : "Password must of atleast 8 characters"}),
      email : z.string().email({message : "Invalid Email format"}),
})