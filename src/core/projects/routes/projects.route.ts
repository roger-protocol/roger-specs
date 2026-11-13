import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { ProjectTag } from "../constants";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import z from "zod";
import { Project } from "../schemas/project.schema";
import { ErrorResponse, InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";
import { ProjectId } from "../schemas/ids.schemas";

export const ListProjectsResponseBody = z.array(Project);

export const CreateProjectBody = Project.pick({ name: true, kind: true, storage_id: true });

export const RenameProjectURLParams = z.object({ projectId: ProjectId });
export const RenameProjectBody = Project.pick({ name: true });

export const DeleteProjectURLParams = z.object({ projectId: ProjectId });

apiRegistry.registerPath({
  method: "get",
  path: "/projects",
  operationId: "listProjects",
  summary: "List Projects",
  description: "Returns an array containing all of the project of an account",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject(
      "Successfully returned all of the account's projects",
      ListProjectsResponseBody,
    ),
    401: UnauthorizedError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects",
  operationId: "createProject",
  summary: "Create A Project",
  description: "Create a new project under the user's account with the provided name",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    body: { content: { "application/json": { schema: CreateProjectBody } } },
  },
  responses: {
    200: createResponseObject("Successfully created the project", Project),
    400: InvalidRequestError,
    401: UnauthorizedError,
    422: createResponseObject(
      "The user has hit the max project limit. Possible error codes: `max_projects_exceeded`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "put",
  path: "/projects/{projectId}",
  operationId: "renameProject",
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
    200: createResponseObject("Successfully renamed the project", Project),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}",
  operationId: "deleteProject",
  summary: "Delete a Project",
  description: "Delete a project permanently",
  tags: [ProjectTag],
  security: [{ [BearerAuth]: [] }],
  request: {
    params: DeleteProjectURLParams,
  },
  responses: {
    200: createResponseObject("Successfully deleted the project", Project),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});
