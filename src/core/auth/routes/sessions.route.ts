import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { AuthError, BearerAuth, ForbiddenError } from "../constants";
import { UserSession } from "../schemas/session.schema";
import z from "zod";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import { createTag } from "@/shared/tags";

const SessionsTag = createTag("Sessions", "Session management routes");

export const ListSessionsResponseBody = z.array(UserSession);
export const RevokeSessionURLParams = z.object({
  sessionId: z
    .string()
    .openapi({ description: "The ID of the session to revoke", example: "rgr_sess_abc123" }),
});

apiRegistry.registerPath({
  method: "get",
  path: "/auth/sessions",
  summary: "List Active Sessions",
  description: "Get informations about every sessions associated to the authenticated user",
  tags: [SessionsTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("The request succeeded and returned all active sessions", [
      ListSessionsResponseBody,
    ]),
    401: createResponseObject("The server was unable to authenticate the user", [AuthError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/auth/sessions/{sessionId}",
  summary: "Revoke a Session",
  description: "Revoke a session based on it's ID (need to be authenticated)",
  tags: [SessionsTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    params: RevokeSessionURLParams,
  },
  responses: {
    204: {
      description: "Successfully revoked session",
    },
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server was unable to authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target session doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/auth/sessions",
  summary: "Revoke Every Other Sessions",
  description:
    "Revoke every active session associated with the authenticated user, excluding the session that made the request",
  tags: [SessionsTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    204: {
      description: "Successfully revoked sessions",
    },
    401: createResponseObject("The server was unable to authenticate the user", [AuthError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
