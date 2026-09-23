import { createTag } from "@/shared/tags";
import z from "zod";

export const EnvironmentsTag = createTag(
  "Environments",
  "All routes used to list/create/delete environments",
);

export const EnvironmentsConfig = z.object({
  maxProjectEnvironments: z.int().openapi({
    description: "The maximum amount of environments a single project can hold",
    example: 5,
  }),
  minEnvironmentNameLength: z.int().openapi({
    description: "The minimum number of characters an environment name must have",
    example: 3,
  }),
  maxEnvironmentNameLength: z.int().openapi({
    description: "The maximum number of characters an environment name must not exceed",
    example: 64,
  }),
  maxPlacesPerUniverse: z.int().openapi({
    description: "The maximum amount of places you can add to an environment of type 'universe' ",
    example: 20,
  }),
});
