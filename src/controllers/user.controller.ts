import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares/error.middleware";
import { prisma } from "../lib/client";
import { responseHandler } from "../handlers/response.handler";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //    return responseHandler(res , "This is the success response" , 200 , {allUsers : []})
    //    return next (new ErrorHandler("Error From My Side" , 400))
  } catch (error) {
    throw error;
  }
};
