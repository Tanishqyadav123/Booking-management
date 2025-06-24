import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "./error.middleware";

export const roleGuard =
  ([...accessRoles]: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!accessRoles.includes(req.user?.userRole as string)) {
      throw next(new ErrorHandler("UnAuthorized access for this role", 403));
    }

    next();
  };
