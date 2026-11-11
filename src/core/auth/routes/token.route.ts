import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { AuthTag } from "../constants";
import z from "zod";
import { AuthorizationCode, RefreshToken } from "../schemas/ids.schema";
import { ErrorResponse, ServerError } from "@/shared/errors";

const AuthorizationCodeGrant = z
  .object({
    grant_type: z.literal("authorization_code").openapi({ description: "OAuth 2.1 grant type" }),
    code: AuthorizationCode.openapi({
      description: "The single-use authorization code recieved from the loopback callback",
    }),
    code_verifier: z.string().openapi({
      description:
        "The raw PKCE code verifier used to generate the code_challenge ([RFC 7636](https://www.rfc-editor.org/info/rfc7636/#section-4.1))",
    }),
    redirect_uri: z.string().openapi({
      description:
        "The redirect uri passed to the first PKCE request ([OAuth 2.1](https://oauth.net/2.1/))",
    }),
    client_name: z.string().optional().openapi({
      description: "A user-friendly client name bound to the user's session",
      example: "Roger CLI (Windows 11)",
    }),
  })
  .openapi("AuthorizationCodeGrant", { title: "Authorization Code" });

const RefreshTokenGrant = z
  .object({
    grant_type: z.literal("refresh_token").openapi({ description: "OAuth 2.1 grant type" }),
    refresh_token: RefreshToken.openapi({
      description: "The long-lived refresh token issued by the node on last refresh",
    }),
  })
  .openapi("RefreshTokenGrant", { title: "Refresh Token" });

export const TokenEndpointRequestBody = z
  .discriminatedUnion("grant_type", [AuthorizationCodeGrant, RefreshTokenGrant])
  .openapi("TokenRequestBody");

export const TokenEndpointRequestResponse = z.object({
  access_token: z
    .string()
    .openapi({ description: "Short-lived JWT access token", example: "eyJhbGciOiJSUzI1NiIs..." }),
  token_type: z
    .literal("Bearer")
    .openapi({ description: "The type of the issued token (standard OAuth 2.1 token type)" }),
  expires_in: z
    .int()
    .positive()
    .openapi({ description: "The lifetime in seconds of the access_token", example: 900 }),
  refresh_token: RefreshToken,
});

apiRegistry.registerPath({
  method: "post",
  path: "/auth/token",
  operationId: "exchangeToken",
  summary: "Obtain or Refresh Access Token",
  tags: [AuthTag],
  description:
    "Exchange the authorization code / refresh token issued by the node for a JWT + refresh token",
  request: {
    body: {
      content: {
        "application/x-www-form-urlencoded": { schema: TokenEndpointRequestBody },
      },
    },
  },
  responses: {
    200: createResponseObject(
      "Successfully authenticated, returns a JWT and Refresh Token",
      TokenEndpointRequestResponse,
    ),
    400: createResponseObject(
      "Invalid request, expired authorization code / refresh token, or PKCE verifier mismatch. Possible error codes: `invalid_request`, `invalid_grant`, `unsupported_grant_type`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});
