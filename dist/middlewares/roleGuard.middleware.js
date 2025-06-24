"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = void 0;
const error_middleware_1 = require("./error.middleware");
const roleGuard = ([...accessRoles]) => (req, res, next) => {
    if (!accessRoles.includes(req.user?.userRole)) {
        throw next(new error_middleware_1.ErrorHandler("UnAuthorized access for this role", 403));
    }
    next();
};
exports.roleGuard = roleGuard;
