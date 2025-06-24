/* eslint-disable @typescript-eslint/no-explicit-any */
import { addNewLocationSchema, updateLocationSchema } from "../validations/location.validation";
import {
  addNewLocationService,
  deleteLocationService,
  getAllLocationService,
  getLocationByIdService,
  updateLocationDetailsService
} from "../repo/location.repo";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares/error.middleware";
import { IP_ADDRESS } from "../config";
import path from "path";
import { responseHandler } from "../handlers/response.handler";

const addNewLocation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Parsing the add New Location Data :-
    console.log("req.fole ", req.file);
    const { userId } = req.user!;
    const { success, data } = addNewLocationSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const newLocation = req.file?.path
      ? await addNewLocationService({ ...data, adminId: userId, locationImage: req.file.path })
      : await addNewLocationService({ ...data, adminId: userId });

    return responseHandler(res, "Location Added SuccessFully", 201, newLocation);
  } catch (error) {
    console.log("Error is ", error);
    throw error;
  }
};

const getAllLocation = async (req: Request, res: Response): Promise<any> => {
  try {
    const allLocations = await getAllLocationService();

    allLocations.forEach((locationDetails) => {
      if (locationDetails.locationImage) {
        const filePath = locationDetails.locationImage.split("\\")[1];

        console.log("my file path", filePath);

        // console.log("my file path", filePath);
        locationDetails.locationImage = IP_ADDRESS + `public/` + filePath;
      }
    });

    return responseHandler(res, "All Location List", 200, allLocations);
  } catch (error) {
    throw error;
  }
};
const getSingleLocation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      throw next(new ErrorHandler("Location Id is not provided", 400));
    }
    const locationDetails = await getLocationByIdService(parseInt(locationId));

    if (!locationDetails) {
      throw next(new ErrorHandler("No Location Details found", 404));
    }

    if (locationDetails.locationImage) {
      const filePath = locationDetails.locationImage.split("\\")[1];
      locationDetails.locationImage = IP_ADDRESS + `public/` + filePath;
    }

    return responseHandler(res, "Location Details", 200, locationDetails);
  } catch (error) {
    throw error;
  }
};

const updateLocationDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = updateLocationSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { locationId } = req.params;

    if (!locationId) {
      throw next(new ErrorHandler("Location Id is not provided", 400));
    }

    if (data.removeImage === "true" && req.file?.path) {
      throw next(new ErrorHandler("Want to remove image but providing a new one", 400));
    }

    const locationDetails = await getLocationByIdService(parseInt(locationId));

    if (!locationDetails) {
      throw next(new ErrorHandler("Location Details is not provided", 400));
    }

    let locationImagePath = req.file ? req.file?.path : locationDetails.locationImage;

    if (data.removeImage === "true") {
      // want to remove the location Image :-
      locationImagePath = null;
    }

    // Update the location Details :-

    const { removeImage, ...rest } = data;
    const updatedDetails = await updateLocationDetailsService({
      locationId: +locationId,
      updateDetails: { ...rest, locationImage: locationImagePath }
    });

    return responseHandler(res, "Updated Location Details", 200, updatedDetails);
  } catch (error) {
    console.log("error ", error);
    throw error;
  }
};

const deleteLocationDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      throw next(new ErrorHandler("Location Id is not provided", 400));
    }

    const locationDetails = await getLocationByIdService(parseInt(locationId));

    if (!locationDetails) {
      throw next(new ErrorHandler("Location Details is not provided", 400));
    }

    // finally Delete the location :-
    await deleteLocationService(+locationId);

    return responseHandler(res, `Location ${locationDetails.name} deleted SuccessFully`, 200);
  } catch (error) {
    throw error;
  }
};
export { addNewLocation, getAllLocation, getSingleLocation, updateLocationDetails, deleteLocationDetails };
