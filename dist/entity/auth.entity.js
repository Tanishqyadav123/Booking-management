"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = exports.verificationCodeType = void 0;
var verificationCodeType;
(function (verificationCodeType) {
    verificationCodeType["FORGOT"] = "FORGOT";
    verificationCodeType["VERIFY"] = "VERIFY";
})(verificationCodeType || (exports.verificationCodeType = verificationCodeType = {}));
var userType;
(function (userType) {
    userType["VIEWER"] = "VIEWER";
    userType["COMEDIAN"] = "COMEDIAN";
    userType["ADMIN"] = "ADMIN";
})(userType || (exports.userType = userType = {}));
