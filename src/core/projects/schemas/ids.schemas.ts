import z from "zod";

export const ProjectId = z
  .string()
  .startsWith("rgr_prj_")
  .openapi({ description: "A unique project identifier", example: "rgr_prj_abc123" });
