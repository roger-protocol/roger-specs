import { apiRegistry } from "@/shared/openapi";
import { createTag } from "@/shared/tags";
import z from "zod";

export const AuthTag = createTag(
  "Authentication",
  "Every endpoints related to user authentication and authorization",
);

export const BearerAuth = "bearerAuth";
apiRegistry.registerComponent("securitySchemes", BearerAuth, {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Enter the access_token returned by /auth/token",
});

export const OAuthError = z
  .object({
    error: z
      .enum(["invalid_request", "invalid_grant", "unsupported_grant_type", "server_error"])
      .openapi({ description: "Standard OAuth 2.1 error code", example: "invalid_grant" }),
    error_description: z.string().openapi({
      description: "A human-readable error description",
      example: "The provided authorization code is invalid",
    }),
  })
  .openapi("OAuthError");

export const RevocationError = z
  .object({
    error: z.enum(["unsupported_token_type"]).openapi({
      description: "RFC 7009 token revocation error code",
      example: "unsupported_token_type",
    }),
    error_description: z.string().openapi({
      description: "A human-readable error description",
      example: "The token type is not supported for this operation",
    }),
  })
  .openapi({ title: "RevocationError" }); // Not registered as a component because it's only really used in the revoke route and used in a single response
