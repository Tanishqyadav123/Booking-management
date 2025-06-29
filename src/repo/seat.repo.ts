import { createNewSeatTypeType } from "../@types/seat.types";
import { prisma } from "../lib/client";

export const getAllSeatTypeService = async () => await prisma.seats.findMany({});
export const createNewSeatTypeService = async (createNewSeatTypeDetails: createNewSeatTypeType) =>
  await prisma.seats.create({
    data: { ...createNewSeatTypeDetails }
  });
