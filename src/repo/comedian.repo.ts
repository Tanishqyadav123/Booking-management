import { prisma } from "../lib/client";

export const getAllMyEventsService = async ({ comedianId }: { comedianId: string }) =>
  prisma.event.findMany({
    where: {
      comedianId
    }
  });
