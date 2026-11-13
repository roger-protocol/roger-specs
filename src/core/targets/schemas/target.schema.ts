import { DeploymentId } from "@/core/deployments";
import { EnvironmentId } from "@/core/environments";
import z from "zod";

export const PlaceTarget = z
  .object({
    kind: z.literal("place").openapi({ description: "The type of the target", example: "place" }),
    name: z.string().openapi({
      description: "The name used in the config file to reference this place",
      example: "arena",
    }),
    environment_id: EnvironmentId,
    place_id: z.string().openapi({ description: "The linked Roblox place's ID" }),
    used_in: z
      .array(DeploymentId)
      .openapi({ description: "The ID of every deployment that currently uses this target" }),
    created_at: z.iso
      .datetime()
      .openapi({ description: "The ISO timestamp at which the place was registered" }),
    updated_at: z.iso
      .datetime()
      .openapi({ description: "The ISO timestamp at which the place was last updated" }),
  })
  .openapi("PlaceTarget", { title: "Place" });

export const Target = z.discriminatedUnion("kind", [PlaceTarget]).openapi("Target");
