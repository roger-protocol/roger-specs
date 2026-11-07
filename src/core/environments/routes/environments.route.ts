import { ProjectId } from "@/core/projects";
import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { EnvironmentsTag } from "../constants";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import { Environment } from "../schemas/environment.schema";
import { InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";
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
  operationId: "listEnvironments",
  summary: "List Environments",
  description: "List every environments in a given project",
  tags: [EnvironmentsTag],
  security: [{ [BearerAuth]: [] }],
  request: { params: GetEnvironmentsURLParams },
  responses: {
    200: createResponseObject("Successfully returned all of the environments", Environment),
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/environments",
  operationId: "createEnvironment",
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
    200: createResponseObject("Successfully created the environment", Environment),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/environments/{environmentId}",
  operationId: "deleteEnvironment",
  summary: "Delete an Environment",
  description:
    "Delete an environment with it's environment id. Every deployment including this environment will not be able to promote to it even if re-created.",
  tags: [EnvironmentsTag],
  security: [{ [BearerAuth]: [] }],
  request: { params: DeleteEnvironmentURLParams },
  responses: {
    200: createResponseObject("Successfully deleted the environment", Environment),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});
