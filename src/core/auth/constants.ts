import { createErrorSchema } from "@/shared/errors";
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

export const AuthError = createErrorSchema("AuthError", [
  "unauthorized",
  "token_invalid",
  "token_expired",
]);

export const ForbiddenError = createErrorSchema("ForbiddenError", [
  "forbidden",
  "insufficient_permissions",
]);

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

export const AuthConfig = z.object({
  providers: z.array(
    z.object({
      id: z.string().nonempty().openapi({
        description: "The id of the provider to use in the oauth url",
        example: "google",
      }),
      name: z
        .string()
        .nonempty()
        .openapi({ description: "A human-friendly name for the provider", example: "Google" }),
      kind: z
        .enum(["google", "apple", "microsoft", "github", "discord", "roblox", "password", "other"])
        .openapi({
          description:
            "A predefined provider list for client to determine the type of the provider (to display icons for example)",
          example: "google",
        }),
    }),
  ),
  jwtPublicKey: z.string().openapi({
    description: "Public key used to verify JWT signature (PEM-encoded)",
    example: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQE...\n-----END PUBLIC KEY-----",
  }),
});
