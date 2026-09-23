import z from "zod";
import { EnvironmentId } from "./ids.schema";

export const Environment = z.object({
  id: EnvironmentId,
  kind: z.enum(["universe", "place"]).openapi({
    description:
      "The kind of ressource the environment will manage (whole universe or single place)",
    example: "universe",
  }),
  universe_id: z.string().openapi({
    description: "The ID of the universe linked to the environment (immutable for now)",
    example: "1234567890",
  }),
  name: z
    .string()
    .lowercase()
    .openapi({ description: "The name of the environment (immutable)", example: "production" }),
  created_at: z.iso
    .datetime()
    .openapi({ description: "The ISO timestamp at which the environment was created" }),
  last_updated_at: z.iso
    .datetime()
    .openapi({ description: "The ISO timestamp at which the environment was last updated" }),
  last_deployed_at: z.iso.datetime().optional().openapi({
    description: "The ISO timestamp at which the last deployment on this environment happened",
  }),
});
