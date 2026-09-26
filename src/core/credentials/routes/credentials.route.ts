import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { CredentialsError, CredentialsTag } from "../constants";
import z from "zod";
import { ProjectId } from "@/core/projects";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import { ApiKeyCredential, Credential } from "../schemas/credential.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import { CredentialId } from "../schemas/ids.schemas";

export const GetCredentialsURLParams = z.object({
  projectId: ProjectId,
});
export const GetCredentialsResonseBody = z.array(Credential);

export const CreateCredentialURLParams = z.object({
  projectId: ProjectId,
});
const CreateCredentialBodyApiKey = ApiKeyCredential.pick({ name: true, kind: true })
  .extend({
    secret_key: z.string().openapi({
      description: "The API Key secret key",
      example: "ai3ypnLUgkuOqm9uG978X+xetx9rDowo9G4DtQQIlKY...",
    }),
  })
  .openapi({ title: "API Key" });
export const CreateCredentialBody = z.discriminatedUnion("kind", [CreateCredentialBodyApiKey]);

export const RenameCredentialURLParams = z.object({
  projectId: ProjectId,
  credentialId: CredentialId,
});
export const RenameCredentialBody = ApiKeyCredential.pick({ name: true });

export const RotateCredentialURLParams = z.object({
  projectId: ProjectId,
  credentialId: CredentialId,
});
const RotateCredentialBodyApiKey = z
  .object({
    secret_key: z.string().openapi({
      description: "The API Key secret key",
      example: "ai3ypnLUgkuOqm9uG978X+xetx9rDowo9G4DtQQIlKY...",
    }),
  })
  .openapi({ title: "API Key" });
export const RotateCredentialBody = z.union([RotateCredentialBodyApiKey]);

export const DeleteCredentialURLParams = z.object({
  projectId: ProjectId,
  credentialId: CredentialId,
});

apiRegistry.registerPath({
  method: "get",
  path: "/projects/{projectId}/credentials",
  summary: "List every Credentials",
  description: "List every credentials linked to one project",
  tags: [CredentialsTag],
  request: { params: GetCredentialsURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully listed credentials", [GetCredentialsResonseBody]),
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
  method: "post",
  path: "/projects/{projectId}/credentials",
  summary: "Register a Credential",
  description: "Link a new Roblox credential to a project",
  tags: [CredentialsTag],
  request: {
    params: CreateCredentialURLParams,
    body: { content: { "application/json": { schema: CreateCredentialBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully created credential", [Credential]),
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
  method: "put",
  path: "/projects/{projectId}/credentials/{credentialId}",
  summary: "Rename a Credential",
  description: "Rename an existing credential",
  tags: [CredentialsTag],
  request: {
    params: RenameCredentialURLParams,
    body: { content: { "application/json": { schema: RenameCredentialBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully renamed credential", [Credential]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/credential doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "post",
  path: "/projects/{projectId}/credentials/{credentialId}/rotate",
  summary: "Rotate a Credential",
  description: "Rotate an existing credential",
  tags: [CredentialsTag],
  request: {
    params: RotateCredentialURLParams,
    body: { content: { "application/json": { schema: RotateCredentialBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully rotated credential", [Credential]),
    400: createResponseObject("Invalid request or invalid credential secret", [
      ValidationError,
      CredentialsError,
    ]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/credential doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

apiRegistry.registerPath({
  method: "delete",
  path: "/projects/{projectId}/credentials/{credentialId}",
  summary: "Delete a Credential",
  description:
    "Delete a credential from a project. Note: The credential must not be linked to any active environments before deleting",
  tags: [CredentialsTag],
  request: { params: DeleteCredentialURLParams },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted credential", [Credential]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target project/credential doesn't exist", [NotFoundError]),
    409: createResponseObject("The target credential is still linked to one or more environments", [
      CredentialsError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
