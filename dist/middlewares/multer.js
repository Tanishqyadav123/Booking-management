"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const error_middleware_1 = require("./error.middleware");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "/public/uploads");
    },
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        if (!file.mimetype.includes("image")) {
            return callback(new error_middleware_1.ErrorHandler("Only Images are allowed", 400));
        }
        return callback(null, true);
    }
});
