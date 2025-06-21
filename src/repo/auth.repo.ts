import { prisma } from "../lib/client"
import { createNewUserType, markAsVerifiedType, upsertVerificationCodeType } from "../types/auth.types"

export const upsertVerificationCodeService = async ({code , codeType , phoneNumber , expiry} : upsertVerificationCodeType) =>{

     await prisma.verificationCode.upsert({
         where : {
             phoneNumber 
         },
         update : {
             code,
             codeType,
             expiry : expiry!
         },
         create : {
             phoneNumber,
             code,
             codeType,
             expiry : expiry!
         }
     })
} 

export const verifyOtpService =async ({code , codeType , phoneNumber} : upsertVerificationCodeType) =>{

    return await prisma.verificationCode.findFirst({
         where : {
             phoneNumber,
             code,
             codeType,
             expiry : {
                 gt : new Date().toISOString()
             },
             isVerified : false
         }
    })


}

export const markAsVerifiedService = async ({phoneNumber , codeType} : markAsVerifiedType) => {
     return await prisma.verificationCode.update({
         where : {
             phoneNumber,
             codeType
         },
         data : {
             isVerified : true,
             code : ""
         }
     })
}


export const isPhoneNumberVerifiedService = async ({phoneNumber} : {phoneNumber : string}) =>{
     return await prisma.verificationCode.findFirst({
         where : {
             phoneNumber,
             isVerified : true
         }
     })
}

export const isUserExistWithEmailOrPhoneService = async ({email , phoneNumber} : {email ?: string , phoneNumber ?: string} ) =>{
    return await prisma.user.findFirst({
         where : {
             OR : [
                {email},
                {phoneNumber}
             ]
         }
     })
}
export const createNewUserService = async (createNewUserDetails : createNewUserType) =>{
    return await prisma.user.create({
         data : {
             ...createNewUserDetails,
         }
     })
}