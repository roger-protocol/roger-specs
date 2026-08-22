import { apiRegistry } from "@/shared/openapi";
import { AuthTag, OAuthError } from "../constants";
import z from "zod";
import { AuthorizationCode, RefreshToken } from "../schemas/ids.schema";
import { composeError } from "@/shared/errors";

export const TokenExchangeRequestBody = z.object({
  grant_type: z
    .literal("authorization_code")
    .default("authorization_code")
    .openapi({ description: "OAuth 2.1 grant type" }),
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
});

export const TokenExchangeRequestResponse = z.object({
  access_token: z
    .string()
    .openapi({ description: "Short-lived JWT access token", example: "eyJhbGciOiJSUzI1NiIs..." }),
  token_type: z
    .literal("Bearer")
    .default("Bearer")
    .openapi({ description: "The type of the issued token (standard OAuth 2.1 token type)" }),
  expires_in: z
    .int()
    .positive()
    .openapi({ description: "The lifetime in seconds of the access_token", example: 900 })
    .optional(),
  refresh_token: RefreshToken.optional(),
});

apiRegistry.registerPath({
  method: "post",
  path: "/auth/token",
  summary: "Exchange Authorization Code",
  tags: [AuthTag],
  description: "Exchange the authorization code issued by the node for a JWT + refresh token",
  request: {
    body: {
      description: "PKCE Token Exchange Payload",
      content: {
        "application/json": { schema: TokenExchangeRequestBody },
      },
    },
  },
  responses: {
    200: {
      description: "Successfully authenticated, returns a JWT and Refresh Token",
      content: {
        "application/json": {
          schema: TokenExchangeRequestResponse,
        },
      },
    },
    400: composeError(
      "Invalid request, expired authorization code, unsupported grant type or PKCE verifier mismatch.",
      [OAuthError],
    ),
    500: composeError("Internal node error during JWT creation or database operations", [
      OAuthError,
    ]),
  },
});
