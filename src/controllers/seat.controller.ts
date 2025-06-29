/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNewSeatTypeService, getAllSeatTypeService } from "../repo/seat.repo";
import { NextFunction, Request, Response } from "express";
import { createNewSeatTyeSchema } from "../validations/seat.validation";
import { ErrorHandler } from "../middlewares/error.middleware";
import { responseHandler } from "../handlers/response.handler";

const getAllSeatType = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const allSeatsTypes = await getAllSeatTypeService();

    if (!allSeatsTypes) {
      throw next(new ErrorHandler("No Seat Type found", 417));
    }

    return responseHandler(res, "All Available Seat types ", 200, allSeatsTypes);
  } catch (error) {
    throw error;
  }
};

const createNewSeatType = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = createNewSeatTyeSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { seatName, seatDescription } = data;

    // Create a New Seat Type :-
    const newSeatType = await createNewSeatTypeService({ seatDescription, seatName });

    return responseHandler(res, "New Seat Type Created SuccessFully ", 201, newSeatType);
  } catch (error) {
    throw error;
  }
};

export { getAllSeatType, createNewSeatType };
