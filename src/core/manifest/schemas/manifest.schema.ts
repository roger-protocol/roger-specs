import { ProjectId } from "@/core/projects";
import z from "zod";
import { SocialLink } from "./social.schema";
import { ConfigurationSchema } from "./configuration.schema";
import { PlaceSchema } from "./place.schema";

const BranchesArray = z.array(z.string()).optional().meta({
  description:
    "Branch patterns that need to be matched with the current active git branch in order to push a deployment",
});

const UniverseEnvironmentSchema = z.object({
  kind: z
    .literal("universe")
    .meta({ description: "The type of ressource the environment manages" }),
  branches: BranchesArray,
  socialLinks: z
    .array(SocialLink)
    .optional()
    .meta({ description: "An array of social links displayed on the game's front page" }),
  configuration: ConfigurationSchema.optional().meta({
    description: "Change the experience settings",
  }),
  places: z
    .object({
      start: PlaceSchema.meta({
        description: "The universe's starting place (its entry point / root place)",
      }),
    })
    .catchall(PlaceSchema)
    .meta({
      description: "A map of place names to their configuration. Must include a 'start' place.",
    }),
});

const PlaceEnvironmentSchema = z.object({
  kind: z.literal("place").meta({ description: "The type of ressource the environment manages" }),
  branches: BranchesArray,
  place: z
    .record(z.string(), PlaceSchema)
    .refine((places) => Object.keys(places).length === 1, {
      error: "An environment of kind 'place' must contain exactly one place",
    }),
});

export const ManifestSchema = z.object({
  node: z.url().meta({ description: "The base URL of the node in charge of your project" }),
  project: ProjectId.meta({ description: "The ID of the target roger project" }),
  environments: z
    .record(
      z.string().meta({ description: "The target project's environment name" }),
      z.discriminatedUnion("kind", [UniverseEnvironmentSchema, PlaceEnvironmentSchema]),
    )
    .meta({ description: "Map environment names to their configuration" }),
});
