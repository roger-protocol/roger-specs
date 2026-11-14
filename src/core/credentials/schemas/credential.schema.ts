import z from "zod";
import { CredentialId } from "./ids.schemas";

const CredentialBase = z.object({
  id: CredentialId,
  name: z.string().openapi({
    description: "The human-friendly name of the credential",
    example: "Test Credential",
  }),
  status: z
    .enum(["success", "info", "warning", "error"])
    .openapi({ description: "The current status of the credential", example: "error" }),
  status_message: z.string().optional().openapi({
    description: "An optional status message",
    example: "This credential has expired, please rotate the secret",
  }),
  created_at: z.iso.datetime().openapi({
    description: "The ISO timestamp at which the credential was created",
    example: "2026-09-06T14:47:42.239Z",
  }),
  updated_at: z.iso.datetime().openapi({
    description: "The ISO timestamp when the credential was last updated",
    example: "2026-09-06T16:31:52.845Z",
  }),
});

export const APIKeySecrets = z.object({
  secret_key: z.string().openapi({
    description: "The API Key secret key",
    example: "ai3ypnLUgkuOqm9uG978X+xetx9rDowo9G4DtQQIlKY...",
  }),
});
export const ApiKeyCredential = CredentialBase.extend({
  kind: z.literal("api-key"),
  account_id: z.string().openapi({
    description: "The ID of the Roblox account that owns the API Key",
    example: "1501705133",
  }),
  expires_at: z.iso.datetime().optional().openapi({
    description: "The ISO timestamp at which the API Key expires",
    example: "2026-09-06T14:47:42.239Z",
  }),
}).openapi("APIKeyCredential", { title: "API Key" });

export const Credential = z.discriminatedUnion("kind", [ApiKeyCredential]).openapi("Credential");
