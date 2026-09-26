import { ProjectId } from "@/core/projects";
import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { EnvironmentsTag } from "../constants";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import { Environment } from "../schemas/environment.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import z from "zod";
import { EnvironmentId } from "../schemas/ids.schema";

export const GetEnvironmentsURLParams = z.object({ projectId: ProjectId });

export const CreateEnvironmentURLParams = z.object({ projectId: ProjectId });
export const CreateEnvironmentRequestBody = Environment.pick({
  name: true,
  universe_id: true,
  kind: true,
  credential_id: true,
});

export const DeleteEnvironmentURLParams = z.object({
  projectId: ProjectId,
  environmentId: EnvironmentId,
});

apiRegistry.registerPath({
  method: "get",
  path: "/projects/{projectId}/environments",
  summary: "Get All Environments",
  description: "Fetch every environments in a given project",
  tags: [EnvironmentsTag],
  security: [{ [BearerAuth]: [] }],
  request: { params: GetEnvironmentsURLParams },
  responses: {
    200: createResponseObject("Successfully returned all of the environments", [Environment]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/environments",
  summary: "Create a new Environment",
  description:
    "Create a new environment under the specified project. You must pass a universe id to link the environment to an exisiting universe for now since Roblox doesn't allow universe creation using API keys yet. Note: The environment name is immutable and must be in lowercase.",
  tags: [EnvironmentsTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    params: CreateEnvironmentURLParams,
    body: { content: { "application/json": { schema: CreateEnvironmentRequestBody } } },
  },
  responses: {
    200: createResponseObject("Successfully created the environment", [Environment]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/universe doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/environments/{environmentId}",
  summary: "Delete an Environment",
  description:
    "Delete an environment with it's environment id. Every deployment including this environment will not be able to promote to it even if re-created.",
  tags: [EnvironmentsTag],
  security: [{ [BearerAuth]: [] }],
  request: { params: DeleteEnvironmentURLParams },
  responses: {
    200: createResponseObject("Successfully deleted the environment", [Environment]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/environment doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
