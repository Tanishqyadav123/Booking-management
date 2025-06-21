"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioClient = void 0;
const _1 = require(".");
const twilio_1 = __importDefault(require("twilio"));
exports.twilioClient = (0, twilio_1.default)(_1.TWILIO_ACCOUNT_SID, _1.TWILIO_AUTH_TOKEN);
