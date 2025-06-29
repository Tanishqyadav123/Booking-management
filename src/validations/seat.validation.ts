import { SeatType } from "../entity/seat.entity";
import { z } from "zod";

export const createNewSeatTyeSchema = z.object({
  seatName: z.enum([SeatType.FRONT, SeatType.MID_RANGE, SeatType.VIP]),
  seatDescription: z.string().nonempty()
});
