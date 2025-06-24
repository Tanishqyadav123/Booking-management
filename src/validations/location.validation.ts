import { z } from "zod";

export const addNewLocationSchema = z.object({
  name: z.string().nonempty({ message: "Name is a required field" }),
  state: z.string().nonempty({ message: "State is a required Field" }),
  country: z.string().nonempty({ message: "Country is a required Field" }),
  description: z.string().nonempty().optional()
});

export const updateLocationSchema = z.object({
  name: z.string().nonempty({ message: "Name is a required field" }).optional(),
  state: z.string().nonempty({ message: "State is a required Field" }).optional(),
  country: z.string().nonempty({ message: "Country is a required Field" }).optional(),
  description: z.string().nonempty().optional(),
  removeImage: z.enum(["false", "true"])
});
