import { apiRegistry } from "@/shared/openapi";
import { AuthTag } from "../constants";
import z from "zod";
import { RefreshToken } from "../schemas/ids.schema";

const AccessTokenBody = z
  .object({
    token: z.string().openapi({
      description: "A valid short-lived access token (JWT)",
      example: "eyJhbGciOiJSUzI1NiIs...",
    }),
    token_type_hint: z
      .literal("access_token")
      .optional()
      .openapi({ description: "Hint to optimize node lookup" }),
  })
  .openapi({ title: "Access Token" });

const RefreshTokenBody = z
  .object({
    token: RefreshToken,
    token_type_hint: z
      .literal("refresh_token")
      .optional()
      .openapi({ description: "Hint to optimize node lookup" }),
  })
  .openapi({ title: "Refresh Token" });

export const RevokeEndpointRequestBody = z.union([AccessTokenBody, RefreshTokenBody]);

apiRegistry.registerPath({
  method: "post",
  path: "/auth/revoke",
  summary: "Revoke a Token",
  tags: [AuthTag],
  description: "Revoke a session using a refresh token / access token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: RevokeEndpointRequestBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The session was successfully revoked OR the token was invalid/expired",
    },
    400: {
      description: "Malformed request body or missing required token parameter.",
      content: {
        "application/json": {
          schema: z.object({
            error: z.enum(["invalid_request", "unsupported_token_type"]).openapi({
              description: "Standard OAuth 2.1 error code",
              example: "invalid_request",
            }),
            error_description: z.string().openapi({
              description: "A human-readable error description",
              example: "Missing required parameter: token",
            }),
          }),
        },
      },
    },
    500: {
      description: "Internal node error during session revocation",
      content: {
        "application/json": {
          schema: z.object({
            error: z
              .enum(["server_error"])
              .openapi({ description: "Standard OAuth 2.1 error code", example: "server_error" }),
            error_description: z.string().openapi({
              description: "A human-readable error description",
              example: "Error while processing revocation",
            }),
          }),
        },
      },
    },
  },
});
