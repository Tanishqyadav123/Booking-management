/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { getAllMyEventsService } from "../repo/comedian.repo";
import { responseHandler } from "../handlers/response.handler";

// Controller for comedian Routes :-
const allMyEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.user!;
    const eventList = await getAllMyEventsService({ comedianId: userId });

    return responseHandler(res, "List of all your events ", 200, eventList);
  } catch (error) {
    throw error;
  }
};

const createNewEvent = async () => {};
export { allMyEvents };
