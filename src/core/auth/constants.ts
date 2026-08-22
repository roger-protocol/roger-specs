import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";

export const AuthTag = createTag(
  "Authentication",
  "Every endpoints related to user authentication and authorization",
);

export const OAuthError = createErrorSchema("OAuthError", [
  "invalid_request",
  "invalid_grant",
  "unsupported_grant_type",
  "server_error",
]);
