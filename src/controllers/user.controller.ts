import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares/error.middleware";
import { responseHandler } from "../handlers/response.handler";
import { prisma } from "../lib/client";

export const getAllUsers = async(req : Request , res : Response , next : NextFunction) : Promise<any> =>{
     try {
     //    return responseHandler(res , "This is the success response" , 200 , {allUsers : []})
     //    return next (new ErrorHandler("Error From My Side" , 400))
       
     }
     catch (error) {
          throw error;
     }
}