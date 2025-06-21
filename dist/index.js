"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = __importDefault(require("./handlers/error.handler"));
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
require("dotenv/config");
const app = (0, express_1.default)();
// Adding the middleware for extracting data :-
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/", routes_1.default);
// Introducing the middleware for error :-
app.use(error_handler_1.default);
console.log("Port is ", config_1.PORT);
app.listen(config_1.PORT, () => {
    console.log(`Server is  running on the PORT : ${config_1.PORT}`);
});
