import jwt, { type JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { decodedUserType } from "../@types/auth.types";
import { ErrorHandler } from "./error.middleware";
import { JWT_SECRET } from "../config";
import { prisma } from "../lib/client";
import { userType } from "../entity/auth.entity";

export const authenticationMiddlware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw next(new ErrorHandler("Unauthorized access denied", 401));
    }

    const decodedUser = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (!decodedUser) {
      throw next(new ErrorHandler("Unauthorized access denied", 401));
    }
    // Check if the user exist with this userId :-

    if (decodedUser.userRole === userType.ADMIN) {
      // Find in the admin Table :-
      const adminUser = await prisma.adminUser.findUnique({
        where: {
          id: decodedUser.userId
        }
      });

      if (!adminUser) {
        throw next(new ErrorHandler("Unauthorized access denied", 401));
      }
    } else {
      // Find in the user Table :-
      const userDetails = await prisma.user.findUnique({
        where: {
          id: decodedUser.userId
        }
      });

      if (!userDetails) {
        throw next(new ErrorHandler("Unauthorized access denied", 401));
      }
    }

    req.user = decodedUser! as decodedUserType;

    next();
  } catch (error) {
    throw error;
  }
};
