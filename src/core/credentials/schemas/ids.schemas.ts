import z from "zod";

export const CredentialId = z
  .string()
  .startsWith("rgr_cred_")
  .openapi({ description: "A credential unique identifier", example: "rgr_cred_abc123" });
