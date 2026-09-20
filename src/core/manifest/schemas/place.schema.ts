import z from "zod";

export const PlaceSchema = z.object({
  file: z.string().meta({ description: "The relative path to the target artefact" }),
  title: z.string().meta({ description: "The place's name" }),
  description: z.string().meta({ description: "The place's description" }).optional(),
  serverSize: z
    .int()
    .meta({ description: "The maximum amount of number allowed in a signle server instance" })
    .optional(),
});
