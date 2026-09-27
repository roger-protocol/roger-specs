import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";

export const StorageTag = createTag("Storage", "All routes related to storage objects");

export const StorageError = createErrorSchema("StorageError", [
  "invalid_credentials",
  "storage_in_use",
]);

export const StorageConfig = z.object({
  maxStorageNameLength: z.int().openapi({
    description: "The maximum number of characters a storage object name can have",
    example: 64,
  }),
  minStorageNameLength: z.int().openapi({
    description: "The minimum number of characters a storage object name must have",
    example: 3,
  }),
  maxStorageObjectsPerOwner: z.int().openapi({
    description: "The maximum amount of storage objects an owner can have",
    example: 3,
  }),
  supportedStorageKind: z
    .enum(["S3", "internal"])
    .openapi({ description: "Supported storage types", example: ["S3", "internal"] }),
});
