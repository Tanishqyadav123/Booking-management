"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.message = error.message || "Internal Server Error";
    res.status(error.statusCode).json({
        success: false,
        message: error.message
    });
};
exports.default = errorMiddleware;
