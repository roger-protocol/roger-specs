import { apiRegistry, createResponseObject } from "@/shared/openapi";
import { DiscoveryTag } from "@/shared/tags";
import z from "zod";

export const VersionResponse = z.object({
  name: z.string().openapi({ description: "The node's name", example: "My Roger Node" }),
  node_description: z
    .string()
    .optional()
    .openapi({ description: "An optional node description", example: "Private node of Acme Corp" }),
  node_version: z
    .string()
    .openapi({ description: "Current node version (SemVer format)", example: "1.3.2" }),
  supported_versions: z
    .array(z.string().regex(/^v\d+$/, { error: "API version must be in format 'v<number>'" }))
    .openapi({
      description: "Major versions supported by the node (/api/v#/...)",
      example: ["v1", "v2", "v3"],
    }),
});
export type VersionResponseType = z.infer<typeof VersionResponse>;

apiRegistry.registerPath({
  method: "get",
  path: "/version",
  summary: "Get Node Information",
  description: "Get node information and identification",
  tags: [DiscoveryTag],
  responses: {
    200: createResponseObject("Node information and identification", [VersionResponse]),
  },
});
