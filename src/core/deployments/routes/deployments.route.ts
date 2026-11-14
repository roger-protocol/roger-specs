import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { DeploymentsTag } from "../constants";
import z from "zod";
import { ProjectId } from "@/core/projects";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import { Deployment } from "../schemas/deployment.schema";
import { ErrorResponse, InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";
import { DeploymentId } from "../schemas/ids.schema";
import { ManifestSchema } from "@/core/manifest";

// List Deployments
export const ListDeploymentsURLParams = z.object({
  projectId: ProjectId,
});
export const ListDeploymentsResponseBody = z.array(Deployment);

apiRegistry.registerPath({
  method: "get",
  path: "/projects/{projectId}/deployments",
  operationId: "listDeployments",
  summary: "List Deployments",
  description: "Return an array of every deployments in a project",
  tags: [DeploymentsTag],
  request: { params: ListDeploymentsURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully returned deployments", ListDeploymentsResponseBody),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

// Create a Deployment
export const CreateDeploymentURLParams = z.object({
  projectId: ProjectId,
});
export const CreateDeploymentRequestBody = z.object({
  environment_id: Deployment.shape.environment_id,
  version: Deployment.shape.version,
  action: z.enum(["deploy", "stage"]).openapi({
    description: "The action that should be done on the deployment after creation",
    example: "stage",
  }),
  manifest: ManifestSchema,
  place_hashes: z.record(z.string(), z.string()).openapi({
    description:
      "A map of every place name declared in the manifest to their uploaded artifact hash",
    example: {
      lobby: "f3a1ef5671fbafb086ed06a5be7c091f39ef8cebae9dd0b160ec4d68e5b322db",
      arena: "c01eaf870848a93224426b8eed25702982f4cce01459c8a53874eccb22fe8a0e",
    },
  }),
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/deployments",
  operationId: "createDeployment",
  summary: "Create a Deployment",
  description: "Create a new deployment",
  tags: [DeploymentsTag],
  request: {
    params: CreateDeploymentURLParams,
    body: {
      required: true,
      content: { "application/json": { schema: CreateDeploymentRequestBody } },
    },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully created deployment", Deployment),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
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
  operationId: "triggerDeployment",
  summary: "Trigger a Staged Deployment",
  description: "Deploy a staged/inactive deployment",
  tags: [DeploymentsTag],
  request: { params: DeployDeploymentURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deployed deployment", Deployment),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    409: createResponseObject(
      "The target deployment isn't staged or inactive and cannot be deployed. Possible error codes: `deployment_not_staged`",
      ErrorResponse,
    ),
    500: ServerError,
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
  operationId: "deleteDeployment",
  summary: "Delete a Deployment",
  description:
    "Delete an existing deployment. Note: The deployment must not be active before deletion",
  tags: [DeploymentsTag],
  request: { params: DeleteDeploymentURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted deployment", Deployment),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    409: createResponseObject(
      "The target deployment is active and cannot be deleted. Possible error codes: `deployment_active`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});
