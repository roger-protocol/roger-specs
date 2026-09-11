import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { ProjectError, ProjectTag } from "../constants";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import z from "zod";
import { Project } from "../schemas/project.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import { ProjectId } from "../schemas/ids.schemas";

export const GetProjectsResponse = z.array(Project);

export const CreateProjectBody = Project.pick({ name: true, kind: true });

export const RenameProjectURLParams = z.object({ projectId: ProjectId });
export const RenameProjectBody = Project.pick({ name: true });

export const DeleteProjectURLParams = z.object({ projectId: ProjectId });

apiRegistry.registerPath({
  method: "get",
  path: "/projects",
  summary: "Get All Projects",
  description: "Returns an array containing all of the project of a user",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully returned all of the user's projects", [
      GetProjectsResponse,
    ]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    500: createResponseObject("The server experienced an error while handling the request", [
      ServerError,
    ]),
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects",
  summary: "Create A Project",
  description: "Create a new project under the user's account with the provided name",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    body: { content: { "application/json": { schema: CreateProjectBody } } },
  },
  responses: {
    200: createResponseObject("Successfully created the project", [Project]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    422: createResponseObject("The user has hit the max project limit", [ProjectError]),
    500: createResponseObject("The server experienced an error while handling the request", [
      ServerError,
    ]),
  },
});

apiRegistry.registerPath({
  method: "put",
  path: "/projects/{projectId}",
  summary: "Rename a Project",
  description: "Update the name of a project",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    body: {
      content: { "application/json": { schema: RenameProjectBody } },
    },
    params: RenameProjectURLParams,
  },
  responses: {
    200: createResponseObject("Successfully renamed the project", [Project]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}",
  summary: "Delete a Project",
  description: "Delete a project permanently",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    params: DeleteProjectURLParams,
  },
  responses: {
    200: createResponseObject("Successfully deleted the project", [Project]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
