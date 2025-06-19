import { Request, Response } from "express";

export const responseHandler = (res : Response , message : string , statusCode : number , data ?: any)=>{
     return res.status(statusCode).json({
         success : true,
         message ,
         data
     })
}