import z from "zod";
import { JwtId, UserId } from "./ids.schema";

export const JwtClaims = z
  .object({
    // Standard RFC7519 Claims (https://www.rfc-editor.org/info/rfc7519/#section-4.1)
    iss: z.url().openapi({
      description: "The URL of the Roger node that issued the JWT",
      example: "myrogernode.com",
    }),
    sub: UserId.openapi({
      description: "The ID of the user the JWT belongs to",
    }),
    aud: z.union([z.url(), z.array(z.url())]).openapi({
      description: "One or multiple URLs where the JWT can be used to authenticate requests",
      example: "myrogernode.com",
    }),
    exp: z.int().positive().openapi({
      description: "The JWT expiration data (UNIX Timestamp in seconds)",
      example: 1787395538,
    }),
    iat: z.int().positive().openapi({
      description: "The time at which the JWT was issued (UNIX Timestamp in seconds)",
      example: 1787394638,
    }),
    jti: JwtId,
  })
  .openapi("JwtClaims");

export type JwtClaims = z.infer<typeof JwtClaims>;
