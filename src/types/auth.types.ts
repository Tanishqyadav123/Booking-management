import { userType, verificationCodeType } from "../entity/auth.entity";

export interface upsertVerificationCodeType  {
     phoneNumber : string,
     code : string, 
     codeType : verificationCodeType
     expiry ?: string
}

export interface markAsVerifiedType {
     phoneNumber : string,
     codeType : verificationCodeType
}

export interface createNewUserType {
     firstName : string,
     lastName : string,
     password : string,
     email : string,
     phoneNumber : string,
     userType : userType
}

