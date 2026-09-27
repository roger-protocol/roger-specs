import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { StorageError, StorageTag } from "../constants";
import { AuthError, BearerAuth, ForbiddenError } from "@/core/auth/constants";
import z from "zod";
import { S3Credentials, S3StorageObject, StorageObject } from "../schemas/storage.schema";
import { NotFoundError, ServerError, ValidationError } from "@/shared/errors";
import { StorageId } from "../schemas/ids.schema";

// Get Storage Objects
export const GetStorageObjectsResponseBody = z.array(StorageObject);

apiRegistry.registerPath({
  method: "get",
  path: "/storage",
  summary: "Fetch Storage Objects",
  description: "Return a list of every storage objects linked to a user's account",
  tags: [StorageTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully returned storage objects", [
      GetStorageObjectsResponseBody,
    ]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Link a new Storage Object
const LinkS3StorageObjectRequestBody = S3StorageObject.pick({
  name: true,
  kind: true,
  bucket_name: true,
  region: true,
  storage_endpoint: true,
})
  .extend(S3Credentials.shape)
  .openapi({ title: "S3 Compatible" });
export const LinkStorageObjectRequestBody = z.discriminatedUnion("kind", [
  LinkS3StorageObjectRequestBody,
]);

apiRegistry.registerPath({
  method: "post",
  path: "/storage",
  summary: "Link a Storage Object",
  description: "Link a new storage object to your account",
  tags: [StorageTag],
  request: { body: { content: { "application/json": { schema: LinkStorageObjectRequestBody } } } },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfull linked the new storage object", [StorageObject]),
    400: createResponseObject("Invalid request or invalid credentials", [
      ValidationError,
      StorageError,
    ]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Rename a Storage Object
export const RenameStorageObjectRequestBody = S3StorageObject.pick({ name: true });
export const RenameStorageObjectRequestURLParams = z.object({
  storageId: StorageId,
});

apiRegistry.registerPath({
  method: "put",
  path: "/storage/{storageId}",
  summary: "Rename a Storage Object",
  description: "Change the name of a storage object",
  tags: [StorageTag],
  request: {
    params: RenameStorageObjectRequestURLParams,
    body: { content: { "application/json": { schema: RenameStorageObjectRequestBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfull renamed the storage object", [StorageObject]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target storage object doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Rotate a Storage Object
export const RotateStorageObjectRequestBody = z.union([
  S3Credentials.openapi({ title: "S3 Credentials" }),
]);
export const RotateStorageObjectRequestURLParams = z.object({
  storageId: StorageId,
});

apiRegistry.registerPath({
  method: "post",
  path: "/storage/{storageId}/rotate",
  summary: "Rotate a Storage Object",
  description: "Rotate the credentials of a storage object",
  tags: [StorageTag],
  request: {
    params: RotateStorageObjectRequestURLParams,
    body: { content: { "application/json": { schema: RotateStorageObjectRequestBody } } },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfull rotated the storage object", [StorageObject]),
    400: createResponseObject("Invalid request or invalid credentials", [
      ValidationError,
      StorageError,
    ]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target storage object doesn't exist", [NotFoundError]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});

// Delete a Storage Object
export const DeleteStorageObjectURLParams = z.object({
  storageId: StorageId,
});

apiRegistry.registerPath({
  method: "delete",
  path: "/storage/{storageId}",
  summary: "Delete a Storage Object",
  description:
    "Delete a storage object from your account. Note: It must not be used by any project before deletion",
  tags: [StorageTag],
  request: {
    params: DeleteStorageObjectURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfull deleted the storage object", [StorageObject]),
    400: createResponseObject("Invalid request", [ValidationError]),
    401: createResponseObject("The server couldn't authenticate the user", [AuthError]),
    403: createResponseObject("The user doesn't have the permission to perform this action", [
      ForbiddenError,
    ]),
    404: createResponseObject("The target storage object doesn't exist", [NotFoundError]),
    409: createResponseObject("The target storage object is still used in one or more project", [
      StorageError,
    ]),
    500: createResponseObject("The server couldn't handle the request", [ServerError]),
  },
});
