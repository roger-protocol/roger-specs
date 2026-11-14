import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import z from "zod";
import { ProjectId } from "../../projects/schemas/ids.schemas";
import { InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";
import { DeploymentsTag } from "../constants";

export const UploadArtifactURLParams = z.object({
  projectId: ProjectId,
});
export const Artifact = z.file().openapi({
  type: "string",
  format: "binary",
  description: "Raw binary .rbxl place artifact",
});
export const UploadArtifactResponseBody = z.object({
  hash: z
    .string()
    .openapi({ description: "The hash of the uploaded artifact computed by the node" }),
  already_stored: z
    .boolean()
    .openapi({ description: "Whether or not the file was already stored on the server" }),
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/artifacts",
  operationId: "uploadArtifact",
  summary: "Upload an Artifact",
  description: "Upload an artifact to the node",
  tags: [DeploymentsTag],
  request: {
    params: UploadArtifactURLParams,
    body: { required: true, content: { "application/octet-stream": { schema: Artifact } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully uploaded file", UploadArtifactResponseBody),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});
