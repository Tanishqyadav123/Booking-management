"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = (res, message, statusCode, data) => res.status(statusCode).json({
    success: true,
    message,
    data
});
exports.responseHandler = responseHandler;
