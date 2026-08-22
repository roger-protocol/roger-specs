import z from "zod";

export const UserId = z
  .string()
  .startsWith("rgr_usr_")
  .openapi({ description: "A unique prefixed user identifier", example: "rgr_usr_9x4hg31..." });

export const JwtId = z
  .string()
  .startsWith("rgr_tok_")
  .openapi({ description: "A unique prefixed JWT identifier (jti)", example: "rgr_jwt_04gb3w..." });

export const AuthorizationCode = z.string().startsWith("rgr_ac_").openapi({
  description:
    "A single-use, short-lived authorization code issued by the node after OAuth approval",
  example: "rgr_ac_8x9f2a11",
});
export const RefreshToken = z
  .string()
  .startsWith("rgr_rt_")
  .openapi({
    description: "A long-lived token used to request new short-lived JWTs",
    example: "rgr_rt_xyz123",
  });
