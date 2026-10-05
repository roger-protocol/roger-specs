import z from "zod";

export const DeploymentId = z
  .string()
  .startsWith("rgr_dply_")
  .openapi({ description: "A unique deployment identifier", example: "rgr_dply_abc123" });
