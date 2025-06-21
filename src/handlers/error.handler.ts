import { NextFunction, Request, Response } from "express";

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  res.status(error.statusCode).json({
    success: false,
    message: error.message
  });
};

export default errorMiddleware;
