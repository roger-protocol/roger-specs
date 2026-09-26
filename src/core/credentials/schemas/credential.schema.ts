import z from "zod";

export const ApiKeyCredential = z
  .object({
    kind: z
      .literal("api-key")
      .openapi({ description: "The kind of the credential", example: "api-key" }),
    name: z
      .string()
      .openapi({ description: "The human-friendly name of the API Key", example: "Test Key" }),
    account_id: z
      .string()
      .openapi({
        description: "The ID of the Roblox account that owns the API Key",
        example: "1501705133",
      }),
    status: z
      .enum(["success", "info", "warning", "error"])
      .openapi({ description: "The current status of the API Key", example: "error" }),
    status_message: z
      .string()
      .optional()
      .openapi({
        description: "An optional status message attached to the key",
        example: "This API Key has expired, please regenerate a new one",
      }),
    created_at: z.iso.datetime().openapi({
      description: "The ISO timestamp at which the API Key was registered on the node",
      example: "2026-09-06T14:47:42.239Z",
    }),
    expires_at: z.iso.datetime().openapi({
      description: "The ISO timestamp at which the API Key expires",
      example: "2026-09-06T14:47:42.239Z",
    }),
    updated_at: z.iso.datetime().openapi({
      description: "The ISO timestamp when the API Key was last updated on the node",
      example: "2026-09-06T16:31:52.845Z",
    }),
  })
  .openapi({ title: "API Key" });

export const Credential = z.discriminatedUnion("kind", [ApiKeyCredential]);
