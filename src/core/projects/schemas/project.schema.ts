import z from "zod";
import { ProjectId } from "./ids.schemas";

export const Project = z.object({
  id: ProjectId,
  kind: z
    .enum(["game"])
    .openapi({ description: "The type of ressource the project will manage", example: "game" }),
  name: z
    .string()
    .nonempty()
    .openapi({ description: "The name of the project", example: "My Awesome Game!" }),
  created_at: z.iso.datetime().openapi({
    description: "The ISO timestamp at which the project was created",
    example: "2026-09-06T14:47:42.239Z",
  }),
  updated_at: z.iso.datetime().openapi({
    description: "The ISO timestamp when project was last updated",
    example: "2026-09-06T16:31:52.845Z",
  }),
  last_deployed_at: z.iso
    .datetime()
    .openapi({
      description: "The ISO timestamp of the last project deployment",
      example: "2026-09-06T16:32:57.627Z",
    })
    .optional(),
});
