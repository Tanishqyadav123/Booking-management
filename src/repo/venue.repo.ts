import { updateVenueType } from "../@types/venue.types";
import { prisma } from "../lib/client";

export const getAllVenueByLocationService = async (locationId: number) =>
  await prisma.venue.findMany({
    where: {
      locationId
    }
  });

export const isVenueAlreadyExistWithNameAndAddress = async ({ name, address }: { name: string; address: string }) =>
  await prisma.venue.findFirst({
    where: {
      AND: [{ name }, { address }]
    }
  });

export const getVenueByIdService = async (venueId: number) =>
  await prisma.venue.findUnique({
    where: {
      id: venueId
    }
  });

export const updateVenueDetailsByIdService = async ({
  venueDetailsToUpdate,
  venueId
}: {
  venueDetailsToUpdate: updateVenueType;
  venueId: number;
}) =>
  prisma.venue.update({
    where: {
      id: venueId
    },
    data: {
      ...venueDetailsToUpdate
    }
  });
