"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByIdService = exports.getAllLocationService = exports.addNewLocationService = void 0;
const client_1 = require("../lib/client");
const addNewLocationService = async (addNewLocationDetails) => await client_1.prisma.location.create({
    data: {
        ...addNewLocationDetails
    }
});
exports.addNewLocationService = addNewLocationService;
const getAllLocationService = async () => await client_1.prisma.location.findMany({});
exports.getAllLocationService = getAllLocationService;
const getLocationByIdService = async (locationId) => await client_1.prisma.location.findUnique({
    where: {
        id: locationId
    }
});
exports.getLocationByIdService = getLocationByIdService;
