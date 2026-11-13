import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { StorageTag } from "../constants";
import { BearerAuth, ForbiddenError, UnauthorizedError } from "@/core/auth/constants";
import z from "zod";
import { S3Credentials, S3StorageObject, StorageObject } from "../schemas/storage.schema";
import { ErrorResponse, InvalidRequestError, NotFoundError, ServerError } from "@/shared/errors";
import { StorageId } from "../schemas/ids.schema";

// Get Storage Objects
export const ListStorageObjectsResponseBody = z.array(StorageObject);

apiRegistry.registerPath({
  method: "get",
  path: "/storage",
  operationId: "listStorageObjects",
  summary: "List Storage Objects",
  description: "Return a list of every storage objects linked to a user's account",
  tags: [StorageTag],
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject(
      "Successfully returned storage objects",
      ListStorageObjectsResponseBody,
    ),
    401: UnauthorizedError,
    403: ForbiddenError,
    500: ServerError,
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
  .openapi("S3CompatibleStorageInfos", { title: "S3 Compatible" });
export const LinkStorageObjectRequestBody = z
  .discriminatedUnion("kind", [LinkS3StorageObjectRequestBody])
  .openapi("LinkStorageObjectRequestBody");

apiRegistry.registerPath({
  method: "post",
  path: "/storage",
  operationId: "createStorageObject",
  summary: "Create a Storage Object",
  description: "Create a new storage object under your account",
  tags: [StorageTag],
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: LinkStorageObjectRequestBody } },
    },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfull linked the new storage object", StorageObject),
    400: createResponseObject(
      "Invalid request or invalid credentials. Possible error codes: `invalid_request`, `invalid_credentials`",
      ErrorResponse,
    ),
    401: UnauthorizedError,
    403: ForbiddenError,
    500: ServerError,
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
  operationId: "renameStorageObject",
  summary: "Rename a Storage Object",
  description: "Change the name of a storage object",
  tags: [StorageTag],
  request: {
    params: RenameStorageObjectRequestURLParams,
    body: {
      required: true,
      content: { "application/json": { schema: RenameStorageObjectRequestBody } },
    },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully renamed the storage object", StorageObject),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

// Rotate a Storage Object
export const RotateStorageObjectRequestBody = z
  .discriminatedUnion("kind", [S3Credentials])
  .openapi("RotateStorageObjectRequestBody");
export const RotateStorageObjectRequestURLParams = z.object({
  storageId: StorageId,
});

apiRegistry.registerPath({
  method: "post",
  path: "/storage/{storageId}/rotate",
  operationId: "rotateStorageObject",
  summary: "Rotate a Storage Object",
  description: "Rotate the credentials of a storage object",
  tags: [StorageTag],
  request: {
    params: RotateStorageObjectRequestURLParams,
    body: {
      required: true,
      content: { "application/json": { schema: RotateStorageObjectRequestBody } },
    },
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully rotated the storage object", StorageObject),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    500: ServerError,
  },
});

// Delete a Storage Object
export const DeleteStorageObjectURLParams = z.object({
  storageId: StorageId,
});

apiRegistry.registerPath({
  method: "delete",
  path: "/storage/{storageId}",
  operationId: "deleteStorageObject",
  summary: "Delete a Storage Object",
  description:
    "Delete a storage object from your account. Note: It must not be used by any project before deletion",
  tags: [StorageTag],
  request: {
    params: DeleteStorageObjectURLParams,
  },
  security: [{ [BearerAuth]: [] }],
  responses: {
    200: createResponseObject("Successfully deleted the storage object", StorageObject),
    400: InvalidRequestError,
    401: UnauthorizedError,
    403: ForbiddenError,
    404: NotFoundError,
    409: createResponseObject(
      "The target storage object is still used in one or more project. Possible error codes: `storage_in_use`",
      ErrorResponse,
    ),
    500: ServerError,
  },
});
