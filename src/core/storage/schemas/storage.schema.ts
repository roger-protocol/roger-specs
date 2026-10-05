import z from "zod";
import { StorageId } from "./ids.schema";
import { UserId } from "@/core/auth";

const UserStorageOwner = z.object({
  kind: z.literal("user").openapi({
    description: "The type of owner that owns the storage object",
    example: "user",
  }),
  id: UserId,
});

export const StorageOwner = z
  .discriminatedUnion("kind", [UserStorageOwner])
  .openapi({ description: "An object representing the ressource that owns the storage object" });

const StorageBase = z.object({
  id: StorageId,
  owner: StorageOwner,
  name: z.string().openapi({
    description: "The human-friendly display name of the storage object",
    example: "Main Storage",
  }),
  status: z
    .enum(["success", "info", "warning", "error"])
    .openapi({ description: "The current status of the storage object", example: "warning" }),
  status_message: z.string().optional().openapi({
    description: "An optional message attached to the storage object status",
    example: "Storage almost full (85% used)",
  }),
});

export const S3Credentials = z.object({
  access_key_id: z
    .string()
    .openapi({ description: "The S3 access key id", example: "SomeAccessKeyId" }),
  secret_access_key: z.string().openapi({
    description: "The secret key associated with the Access Key ID",
    example: "SuperSecretKey",
  }),
});

export const S3StorageObject = StorageBase.extend({
  kind: z
    .literal("S3")
    .openapi({ description: "The kind of storage referenced by this object", example: "S3" }),
  bucket_name: z
    .string()
    .openapi({ description: "The name of the target S3 storage bucket", example: "roger-bucket" }),
  storage_endpoint: z.url().openapi({
    description: "The S3 URL of the storage bucket",
    example: "https://s3.eu-central-003.backblazeb2.com",
  }),
  region: z
    .string()
    .openapi({ description: "The region of your S3 bucket", example: "eu-central" }),
  created_at: z.iso.datetime().openapi({
    description: "The ISO timestamp at which the S3 storage bucket was registered on the node",
    example: "2026-09-06T14:47:42.239Z",
  }),
  updated_at: z.iso.datetime().openapi({
    description: "The ISO timestamp when the S3 storage bucket was last updated on the node",
    example: "2026-09-06T16:31:52.845Z",
  }),
}).openapi({ title: "S3 Compatible" });

export const InternalStorageObject = StorageBase.extend({
  kind: z
    .literal("internal")
    .openapi({ description: "The kind of storage referenced by this object", example: "internal" }),
  storage_capacity: z.int().min(-1).openapi({
    description: "The capacity of the internal storage object in bytes (base-2)",
    example: 5_368_709_120,
  }),
  storage_used: z.int().min(0).openapi({
    description: "The number of bytes used in the internal storage object (base-2)",
    example: 1_073_741_824,
  }),
  updated_at: z.iso.datetime().openapi({
    description: "The ISO timestamp when the internal storage object was last updated",
    example: "2026-09-06T16:31:52.845Z",
  }),
}).openapi({ title: "Internal Storage" });

export const StorageObject = z.discriminatedUnion("kind", [S3StorageObject, InternalStorageObject]);
