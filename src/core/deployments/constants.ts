import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";

export const DeploymentsTag = createTag("Deployments", "All routes related to deployments");

export const DeploymentError = createErrorSchema("DeploymentError", [
  "deployment_not_staged",
  "deployment_active",
]);

export const DeploymentsConfig = z.object({
  maxDeploymentsPerProject: z.int().min(-1).openapi({
    description: "The maximum number of deployments a single project can hold",
    example: 50,
  }),
  minVersionLength: z
    .int()
    .min(1)
    .openapi({ description: "The minimum length of a deployment version string", example: 1 }),
  maxVersionLength: z
    .int()
    .min(-1)
    .openapi({ description: "The maximum length of a deployment version string", example: 64 }),
  maxPlaceFileSizeBytes: z.int().min(-1).openapi({
    description: "The maximum place file (.rbxl) size in bytes (base-2)",
    example: 5_368_709_120,
  }),
});
