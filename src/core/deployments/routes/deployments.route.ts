import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { DeploymentError, DeploymentsTag } from "../constants";
import z from "zod";
import { ProjectId } from "@/core/projects";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import { Deployment } from "../schemas/deployment.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import { DeploymentId } from "../schemas/ids.schema";

// Get Deployments
export const GetDeploymentsURLParams = z.object({
  projectId: ProjectId,
});
export const GetDeploymentsResponseBody = z.array(Deployment);

apiRegistry.registerPath({
  method: "get",
  path: "/projects/{projectId}/deployments",
  summary: "List Deployments",
  description: "Return an array of every deployments in a project",
  tags: [DeploymentsTag],
  request: { params: GetDeploymentsURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully returned deployments", [GetDeploymentsResponseBody]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Create a Deployment
export const CreateDeploymentURLParams = z.object({
  projectId: ProjectId,
});
export const CreateDeploymentRequestBody = z.object({
  environmentId: Deployment.shape.environmentId,
  version: Deployment.shape.version,
  action: z.enum(["deploy", "stage"]).openapi({
    description: "The action that should be done on the deployment after upload",
    example: "stage",
  }),
  config: z
    .any()
    .openapi({ type: "string", format: "binary", description: "The roger.yml config file" }),
  place_hashes: z.string().optional().openapi({
    description:
      "A stringified JSON object mapping place names to artifact hashes already stored on the server (checked via the /artifacts/check route)",
    example: '{"lobby": "abc123...", "arena": "def456..."}',
  }),
  places: z
    .array(
      z.any().openapi({
        type: "string",
        format: "binary",
        description:
          "A zipped .rbxl binary. The filename parameter in the Content-Disposition header must match the target place name in the config file",
      }),
    )
    .optional()
    .openapi({
      format: "binary",
      description:
        "An array of zipped rbxl binaries, one per place. Each part must use the place name as it's filename",
    }),
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/deployments",
  summary: "Create a Deployment",
  description: "Create a new deployment",
  tags: [DeploymentsTag],
  request: {
    params: CreateDeploymentURLParams,
    body: { content: { "multipart/form-data": { schema: CreateDeploymentRequestBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully created deployment", [Deployment]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Deploy a Staged/Inactive Deployment
export const DeployDeploymentURLParams = z.object({
  projectId: ProjectId,
  deploymentId: DeploymentId,
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/deployments/{deploymentId}/deploy",
  summary: "Deploy a Staged Deployment",
  description: "Deploy a staged/inactive deployment",
  tags: [DeploymentsTag],
  request: { params: DeployDeploymentURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deployed deployment", [Deployment]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/deployment doesn't exist", [NotFoundError]),
    409: createResponseObject(
      "The target deployment isn't staged or inactive and cannot be deployed",
      [DeploymentError],
    ),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Delete a Deployment
export const DeleteDeploymentURLParams = z.object({
  projectId: ProjectId,
  deploymentId: DeploymentId,
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/deployments/{deploymentId}",
  summary: "Delete a Deployment",
  description:
    "Delete an existing deployment. Note: The deployment must not be active before deletion",
  tags: [DeploymentsTag],
  request: { params: DeleteDeploymentURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted deployment", [Deployment]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/deployment doesn't exist", [NotFoundError]),
    409: createResponseObject("The target deployment is active and cannot be deleted", [
      DeploymentError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
