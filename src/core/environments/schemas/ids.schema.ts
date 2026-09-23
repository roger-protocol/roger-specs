import z from "zod";

export const EnvironmentId = z
  .string()
  .startsWith("rgr_env_")
  .openapi({ description: "A unique environment identifier", example: "rgr_env_abc123" });
