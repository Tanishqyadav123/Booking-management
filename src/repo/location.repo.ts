import { addNewLocationType, updateLocationType } from "../@types/location.types";
import { prisma } from "../lib/client";

export const addNewLocationService = async (addNewLocationDetails: addNewLocationType) =>
  await prisma.location.create({
    data: {
      ...addNewLocationDetails
    }
  });

export const getAllLocationService = async () => await prisma.location.findMany({});

export const getLocationByIdService = async (locationId: number) =>
  await prisma.location.findUnique({
    where: {
      id: locationId
    }
  });

export const updateLocationDetailsService = async ({
  locationId,
  updateDetails
}: {
  locationId: number;
  updateDetails: updateLocationType;
}) =>
  await prisma.location.update({
    where: {
      id: locationId
    },
    data: {
      ...updateDetails
    }
  });

export const deleteLocationService = async (locationId: number) =>
  await prisma.location.delete({
    where: {
      id: locationId
    }
  });
