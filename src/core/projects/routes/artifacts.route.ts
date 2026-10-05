import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { ProjectTag } from "../constants";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import z from "zod";
import { ProjectId } from "../schemas/ids.schemas";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";

export const CheckArtifactURLParams = z.object({
  projectId: ProjectId,
});
export const CheckArtifactRequestBody = z.object({
  hashes: z
    .array(z.string())
    .openapi({ description: "An array of hashes to check", example: ["abcd1234", "qwerty0987"] }),
});
export const CheckArtifactResponseBody = z.object({
  artifacts: z.record(z.string(), z.boolean()).openapi({
    description: "Returns true(stored)/false(not stored) for every passed hash",
    example: { abcd1234: false, qwerty0987: true },
  }),
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/artifacts/check",
  summary: "Check Artifact is Already Stored",
  description:
    "Pass an array of file hashes to check and the node should return whether or not the file is stored or not",
  tags: [ProjectTag],
  request: {
    params: CheckArtifactURLParams,
    body: { content: { "application/json": { schema: CheckArtifactRequestBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully checked hashes", [CheckArtifactResponseBody]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
