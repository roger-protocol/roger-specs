import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { TargetsTag } from "../constants";
import z from "zod";
import { ProjectId } from "@/core/projects";
import { EnvironmentId } from "@/core/environments";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import { PlaceTarget, Target } from "../schemas/target.schema";
import { ErrorResponse, InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";

export const GetTargetsURLParams = z.object({
  projectId: ProjectId,
  environmentId: EnvironmentId,
});

export const CreateTargetURLParams = z.object({
  projectId: ProjectId,
  environmentId: EnvironmentId,
});
export const CreateTargetBody = PlaceTarget.pick({ name: true, place_id: true });

export const EditTargetURLParams = z.object({
  projectId: ProjectId,
  environmentId: EnvironmentId,
  name: PlaceTarget.shape.name,
});
export const EditTargetBody = PlaceTarget.pick({ place_id: true });

export const DeleteTargetURLParams = z.object({
  projectId: ProjectId,
  environmentId: EnvironmentId,
  name: PlaceTarget.shape.name,
});

apiRegistry.registerPath({
  method: "get",
  path: "/projects/{projectId}/environments/{environmentId}/targets",
  operationId: "listTargets",
  summary: "List Targets",
  description: "Get a list of all targets linked to one environment",
  tags: [TargetsTag],
  request: {
    params: GetTargetsURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully retrieved targets", Target),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/environments/{environmentId}/targets",
  operationId: "createTarget",
  summary: "Create Target",
  description: "Create a new target under the specified environment",
  tags: [TargetsTag],
  request: {
    params: CreateTargetURLParams,
    body: { content: { "application/json": { schema: CreateTargetBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully created target", Target),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "put",
  path: "/projects/{projectId}/environments/{environmentId}/targets/{name}",
  operationId: "changeTargetRessourceId",
  summary: "Edit Target Ressource ID",
  description: "Change the id of the ressource the target is pointing to",
  tags: [TargetsTag],
  request: {
    params: EditTargetURLParams,
    body: { content: { "application/json": { schema: EditTargetBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully edited target", Target),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/environments/{environmentId}/targets/{name}",
  operationId: "deleteTarget",
  summary: "Delete Target",
  description:
    "Delete a target from an environment (must delete every deployments associated with the target first)",
  tags: [TargetsTag],
  request: {
    params: DeleteTargetURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted target", Target),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,

    409: createResponseObject(
      "The target is still referenced in one or more deployments and cannot be deleted. Possible error codes: `target_in_use`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});
