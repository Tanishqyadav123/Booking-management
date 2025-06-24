"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewLocationSchema = void 0;
const zod_1 = require("zod");
exports.addNewLocationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is a required field" }),
    state: zod_1.z.string().nonempty({ message: "State is a required Field" }),
    country: zod_1.z.string().nonempty({ message: "Country is a required Field" }),
    description: zod_1.z.string().nonempty().optional()
});
