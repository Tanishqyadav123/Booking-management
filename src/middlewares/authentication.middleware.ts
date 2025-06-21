import jwt, { type JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { decodedUserType } from "../@types/auth.types";
import { ErrorHandler } from "./error.middleware";
import { JWT_SECRET } from "../config";

export const authenticationMiddlware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw next(new ErrorHandler("Unauthorized access denied", 401));
    }

    const decodedUser = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    req.user = decodedUser! as decodedUserType;
    next();
  } catch (error) {
    throw error;
  }
};
