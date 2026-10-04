import z from "zod";
import { DeploymentId } from "./ids.schema";
import { EnvironmentId } from "@/core/environments";

export const DeploymentStatus = z
  .enum(["active", "inactive", "staged", "error"])
  .openapi({ description: "The status of the deployment", example: "staged" });

export const Deployment = z.object({
  id: DeploymentId,
  environmentId: EnvironmentId.openapi({
    description: "The ID of the environment the deployment belongs to",
  }),
  version: z
    .string()
    .openapi({ description: "The deployment version string", example: "v2.3.1-hotfix" }),
  status: DeploymentStatus,
  last_deployment: DeploymentId.openapi({ description: "The ID of the last active deployment" }),
  created_at: z.iso.datetime().openapi({
    description: "The ISO timestamp at which the deployment was created",
    example: "2026-09-06T14:47:42.239Z",
  }),
});
