import { apiRegistry } from "@/shared/openapi";
import { AuthTag } from "../constants";
import z from "zod";

export const OAuthLoginUrlParams = z.object({
  provider: z.string().openapi({ description: "The ID of the provider to use", example: "google" }),
  code_challenge: z.string().openapi({
    description: "See [RFC 7636](https://www.rfc-editor.org/info/rfc7636/#section-4.2)",
  }),
  code_challenge_method: z.literal("S256").default("S256").openapi({
    description: "The hashing method used to create the code challenge (RFC 7636)",
  }),
  redirect_uri: z.url().openapi({
    description:
      "The client callback URL the user will be redirected to with a server-issued authorization code",
    example: "localhost:8080/oauth/callback/{provider}",
  }),
  state: z.string().openapi({
    description:
      "A high-entropy unique CSRF token that will be passed back in the loopback callback",
  }),
});

apiRegistry.registerPath({
  method: "get",
  path: "/auth/oauth",
  summary: "Initiate OAuth Login",
  tags: [AuthTag],
  description:
    "Entry point for public clients to login their user. The node should immediately redirect the user to the requested provider OAuth page (302 temporary redirect to avoid browser caching)",
  request: {
    query: OAuthLoginUrlParams,
  },
  responses: {
    302: {
      description: "Redirect to the OAuth provider's authorization endpoint",
    },
    400: {
      description: "Invalid parameters",
      content: {
        "application/json": {
          schema: z.object({
            error: z
              .string()
              .openapi({ description: "Error message", example: "Unsupported provider" }),
          }),
        },
      },
    },
  },
});
