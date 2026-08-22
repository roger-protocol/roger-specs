import z from "zod";
import { FeatureRegistry } from "@/shared/features";
import { apiRegistry } from "@/shared/openapi";
import { DiscoveryTag } from "@/shared/tags";

export const FeatureResponse = z.object({
  features: z.object(FeatureRegistry),
});
export type FeatureResponseType = z.infer<typeof FeatureResponse>;

apiRegistry.registerPath({
  method: "get",
  path: "/features",
  summary: "Get Node Features",
  tags: [DiscoveryTag],
  description: "Get the node's supported features and their configuration",
  responses: {
    200: {
      description: "Node's supported features and their configuration",
      content: {
        "application/json": {
          schema: FeatureResponse,
        },
      },
    },
  },
});
