import { z } from "zod";

const createVenueSeatSchema = z.object({
  seatId: z.string().nonempty(),
  seatCount: z.string().nonempty(),
  price: z.string().nonempty()
});

export const createNewVenueSchema = z.object({
  name: z.string().nonempty(),
  locationId: z.string().nonempty(),
  address: z.string().nonempty(),
  venueSeats: z.array(createVenueSeatSchema).nonempty()
});

export const updateVenueSchema = z.object({
  name: z.string().nonempty().optional(),
  locationId: z.string().nonempty().optional(),
  address: z.string().nonempty().optional(),
  removeImage: z.enum(["true", "false"])
});
