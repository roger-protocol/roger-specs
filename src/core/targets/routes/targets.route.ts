import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { TargetError, TargetsTag } from "../constants";
import z from "zod";
import { ProjectId } from "@/core/projects";
import { EnvironmentId } from "@/core/environments";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import { PlaceTarget, Target } from "../schemas/target.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";

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
  summary: "Fetch Targets",
  description: "Get a list of all targets linked to one environment",
  tags: [TargetsTag],
  request: {
    params: GetTargetsURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully retrieved targets", [Target]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/environment doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/environments/{environmentId}/targets",
  summary: "Create Target",
  description: "Create a new target under the specified environment",
  tags: [TargetsTag],
  request: {
    params: CreateTargetURLParams,
    body: { content: { "application/json": { schema: CreateTargetBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully created target", [Target]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/environment doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "put",
  path: "/projects/{projectId}/environments/{environmentId}/targets/{name}",
  summary: "Edit Target Ressource ID",
  description: "Change the id of the ressource the target is pointing to",
  tags: [TargetsTag],
  request: {
    params: EditTargetURLParams,
    body: { content: { "application/json": { schema: EditTargetBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully edited target", [Target]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/environment/target doesn't exist", [
      NotFoundError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/environments/{environmentId}/targets/{name}",
  summary: "Delete Target",
  description:
    "Delete a target from an environment (must delete every deployments associated with the target first)",
  tags: [TargetsTag],
  request: {
    params: DeleteTargetURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted target", [Target]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/environment/target doesn't exist", [
      NotFoundError,
    ]),
    409: createResponseObject(
      "The target is still referenced in one or more deployments and cannot be deleted",
      [TargetError],
    ),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
