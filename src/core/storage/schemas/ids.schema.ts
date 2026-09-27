import z from "zod";

export const StorageId = z
  .string()
  .startsWith("rgr_strg_")
  .openapi({ description: "A unique storage identifier", example: "rgr_strg_abc123" });
