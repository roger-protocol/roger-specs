import z from "zod";
import { AuthorizationCode } from "./ids.schema";

export const OAuthCallbackUrlParams = z.object({
  code: AuthorizationCode.optional(),
  state: z
    .string()
    .openapi({
      description: "The same CSRF token given by the client in the first step of the OAuth flow",
    }),
  error: z.string().optional().openapi({
    description: "An OAuth 2.1 error code (present if authentication failed or was canceled)",
    example: "access_denied",
  }),
  error_description: z.string().optional().openapi({
    description: "A human-readable description of the authentication failure",
    example: "The user canceled the authentication prompt",
  }),
});
