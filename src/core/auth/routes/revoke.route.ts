import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { AuthTag } from "../constants";
import z from "zod";
import { ErrorResponse, ServerError } from "@/shared/errors";

const RevokeEndpointRequestBody = z.object({
  token: z.string().openapi({
    description: "A valid short-lived access token (JWT) or refresh token",
  }),
  token_type_hint: z
    .enum(["access_token", "refresh_token"])
    .openapi({ description: "Hint to optimize node lookup" }),
});

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
