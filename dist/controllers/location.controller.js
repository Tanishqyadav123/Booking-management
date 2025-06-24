"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleLocation = exports.getAllLocation = exports.addNewLocation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const location_repo_1 = require("../repo/location.repo");
const location_validation_1 = require("../validations/location.validation");
const error_middleware_1 = require("../middlewares/error.middleware");
const response_handler_1 = require("../handlers/response.handler");
const addNewLocation = async (req, res, next) => {
    try {
        // Parsing the add New Location Data :-
        const { userId } = req.user;
        const { success, data } = location_validation_1.addNewLocationSchema.safeParse(req.body);
        if (!success) {
            throw next(new error_middleware_1.ErrorHandler("Validation Failed", 400));
        }
        const newLocation = await (0, location_repo_1.addNewLocationService)({ ...data, adminId: userId });
        return (0, response_handler_1.responseHandler)(res, "Location Added SuccessFully", 201, newLocation);
    }
    catch (error) {
        console.log("Error is ", error);
        throw error;
    }
};
exports.addNewLocation = addNewLocation;
const getAllLocation = async (req, res) => {
    try {
        const allLocations = await (0, location_repo_1.getAllLocationService)();
        return (0, response_handler_1.responseHandler)(res, "All Location List", 200, allLocations);
    }
    catch (error) {
        throw error;
    }
};
exports.getAllLocation = getAllLocation;
const getSingleLocation = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        if (!locationId) {
            throw next(new error_middleware_1.ErrorHandler("Location Id is not provided", 400));
        }
        const locationDetails = await (0, location_repo_1.getLocationByIdService)(parseInt(locationId));
        if (!locationDetails) {
            throw next(new error_middleware_1.ErrorHandler("No Location Details found", 404));
        }
        return (0, response_handler_1.responseHandler)(res, "Location Details", 200, locationDetails);
    }
    catch (error) {
        throw error;
    }
};
exports.getSingleLocation = getSingleLocation;
