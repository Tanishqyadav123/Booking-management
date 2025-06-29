/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllVenueByLocationService,
  getVenueByIdService,
  isVenueAlreadyExistWithNameAndAddress,
  updateVenueDetailsByIdService
} from "../repo/venue.repo";
import { NextFunction, Request, response, Response } from "express";
import { createNewVenueSchema, updateVenueSchema } from "../validations/venue.validation";
import { ErrorHandler } from "../middlewares/error.middleware";
import { getLocationByIdService } from "../repo/location.repo";
import { prisma } from "../lib/client";
import { responseHandler } from "../handlers/response.handler";
import { generateFilePath } from "../utils/generateFilepath";

const getAllVenueByLocation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      throw next(new ErrorHandler("Location Id is not Provided ", 400));
    }

    const locationDetails = await getLocationByIdService(+locationId);

    if (!locationDetails) {
      throw next(new ErrorHandler("Location Details with Provided Id not found", 404));
    }

    // Fetch all the venue for this locationId :-
    const allList = await getAllVenueByLocationService(+locationId);

    const allVenuesList = allList.map((venueDetails) => {
      if (venueDetails.venueImage) {
        return { ...venueDetails, venueImage: generateFilePath(venueDetails.venueImage) };
      }

      return { ...venueDetails };
    });

    return responseHandler(res, `All Venues in ${locationDetails.name}`, 200, allVenuesList);
  } catch (error) {
    throw error;
  }
};

const createNewVenue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const file = req.file;
    const { success, data } = createNewVenueSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }
    const { address, locationId, name, venueSeats } = data;
    // Check if the Location Exist :-
    const locationDetails = await getLocationByIdService(+locationId);

    if (!locationDetails) {
      throw next(new ErrorHandler("Location Details with Provided Id not found", 404));
    }

    // Check if any venues with same address and name does not already exist :-
    const isVenueExist = await isVenueAlreadyExistWithNameAndAddress({ name, address });

    if (isVenueExist) {
      throw next(new ErrorHandler("Venue with this name and location Already Exist", 400));
    }

    // Creating the data for venue seats :-

    // New to Create a transaction for creating venue and venue seats :-

    await prisma.$transaction(async (tx) => {
      const newVenue = await tx.venue.create({
        data: {
          locationId: +locationId,
          address,
          name,
          venueImage: file ? file.path : null
        }
      });
      // Create Venues Seats :-
      const venueSeatsData = venueSeats.map((seatData) => ({
        ...seatData,
        venueId: newVenue.id,
        price: +seatData.price,
        seatCount: +seatData.seatCount,
        seatId: +seatData.seatId
      }));

      await tx.venueSeats.createMany({
        data: venueSeatsData
      });
    });

    return responseHandler(res, `New Venue Created ${locationDetails.name}`, 201);
  } catch (error) {
    throw error;
  }
};

const getVenueById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { venueId } = req.params;

    if (!venueId) {
      throw next(new ErrorHandler("Venue id is not provided", 400));
    }

    // Find the venue By id :-
    const venueDetails = await getVenueByIdService(+venueId);

    if (!venueDetails) {
      throw next(new ErrorHandler("Venue Details for Provided Id not found", 404));
    }

    if (venueDetails.venueImage) {
      venueDetails.venueImage = generateFilePath(venueDetails.venueImage);
    }

    return responseHandler(res, "Venue Details ", 200, venueDetails);
  } catch (error) {
    throw error;
  }
};

const updateVenueDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { venueId } = req.params;

    const { success, data } = updateVenueSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    if (!venueId) {
      throw next(new ErrorHandler("Venue id is not provided", 400));
    }

    // Find the venue By id :-
    const venueDetails = await getVenueByIdService(+venueId);

    if (!venueDetails) {
      throw next(new ErrorHandler("Venue Details for Provided Id not found", 404));
    }

    // Check if the image is Request to remove or new Uploaded :-
    const { removeImage, ...rest } = data;

    let filePath: string | null = null;
    if (removeImage == "true" && req?.file?.path) {
      // requested to remove but provide new Image :-
      throw next(new ErrorHandler("Want to remove image but providing a new one", 400));
    }

    if (removeImage === "false" && req?.file?.path) {
      filePath = req.file.path;
    }
    if (removeImage === "false" && !req?.file?.path) {
      filePath = venueDetails.venueImage;
    }

    if (removeImage === "true") {
      filePath = null;
    }
    const detailsToUpdate = { ...rest };
    // Update the details of venue :-
    const updatedVenueDetails = await updateVenueDetailsByIdService({
      venueDetailsToUpdate: {
        ...detailsToUpdate,
        venueImage: filePath,
        locationId: rest.locationId ? +rest.locationId : venueDetails.locationId,
        address: rest.address ? rest.address : venueDetails.address,
        name: rest.name ? rest.name : venueDetails.name
      },
      venueId: +venueId
    });

    return responseHandler(res, "Venues Details updated successFully!!!", 200, updatedVenueDetails);
  } catch (error) {
    throw error;
  }
};

export { getAllVenueByLocation, createNewVenue, getVenueById, updateVenueDetails };
