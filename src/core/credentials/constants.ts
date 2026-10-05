import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";

export const CredentialsTag = createTag(
  "Credentials",
  "Routes related to creating/fetching/editing/deleting/rotating credentials",
);

export const CredentialsError = createErrorSchema("CredentialsError", [
  "credential_in_use",
  "invalid_secret",
]);

export const CredentialsConfig = z.object({
  maxCredentialNameLength: z.int().openapi({
    description: "The maximum number of characters a credential name can have",
    example: 64,
  }),
  minCredentialNameLength: z.int().openapi({
    description: "The minimum number of characters a credential name must have",
    example: 3,
  }),
  maxCredentialsPerProject: z
    .int()
    .openapi({ description: "The maximum amount of credentials a project can hold", example: 5 }),
  supportedCredentialKinds: z
    .array(z.enum(["api-key"]))
    .openapi({ description: "An array of supported credential kinds", example: ["api-key"] }),
});
