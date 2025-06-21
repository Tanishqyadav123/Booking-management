import { Request, Response } from "express";

export const responseHandler = (res: Response, message: string, statusCode: number, data?: any) =>
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
