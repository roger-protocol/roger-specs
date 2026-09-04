import z from "zod";

export const UserId = z
  .string()
  .startsWith("rgr_usr_")
  .openapi({ description: "A unique prefixed user identifier", example: "rgr_usr_abc123" });

export const JwtId = z
  .string()
  .startsWith("rgr_tok_")
  .openapi({ description: "A unique prefixed JWT identifier (jti)", example: "rgr_jwt_abc123" });

export const AuthorizationCode = z.string().startsWith("rgr_ac_").openapi({
  description:
    "A single-use, short-lived authorization code issued by the node after OAuth approval",
  example: "rgr_ac_abc123",
});

export const RefreshToken = z.string().startsWith("rgr_rt_").openapi({
  description: "A long-lived token used to request new short-lived JWTs",
  example: "rgr_rt_abc123",
});

export const SessionId = z
  .string()
  .startsWith("rgr_sess_")
  .openapi({ description: "A unique session identifier", example: "rgr_sess_abc123" });
