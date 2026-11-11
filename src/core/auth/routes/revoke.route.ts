import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { AuthTag } from "../constants";
import z from "zod";
import { RefreshToken } from "../schemas/ids.schema";
import { ErrorResponse, ServerError } from "@/shared/errors";

const AccessTokenBody = z
  .object({
    token: z.string().openapi({
      description: "A valid short-lived access token (JWT)",
      example: "eyJhbGciOiJSUzI1NiIs...",
    }),
    token_type_hint: z
      .literal("access_token")
      .openapi({ description: "Hint to optimize node lookup" }),
  })
  .openapi("AccessTokenRevokeGrant", { title: "Access Token" });

const RefreshTokenBody = z
  .object({
    token: RefreshToken,
    token_type_hint: z
      .literal("refresh_token")
      .openapi({ description: "Hint to optimize node lookup" }),
  })
  .openapi("RefreshTokenRevokeGrant", { title: "Refresh Token" });

export const RevokeEndpointRequestBody = z
  .discriminatedUnion("token_type_hint", [AccessTokenBody, RefreshTokenBody])
  .openapi("RevokeRequestBody");

apiRegistry.registerPath({
  method: "post",
  path: "/auth/revoke",
  operationId: "revokeToken",
  summary: "Revoke a Token",
  tags: [AuthTag],
  description: "Revoke a session using a refresh token / access token",
  request: {
    body: {
      content: {
        "application/x-www-form-urlencoded": {
          schema: RevokeEndpointRequestBody,
        },
      },
    },
  },
  responses: {
    200: {
      description: "The session was successfully revoked OR the token was invalid/expired",
    },
    400: createResponseObject(
      "Malformed request body or missing required token parameter. Possible error codes: `invalid_request`, `unsupported_token_type`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});
