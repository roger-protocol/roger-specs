import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";
import { TargetKind } from "./schemas/target.schema";

export const TargetsTag = createTag(
  "Targets",
  "Routes used to fetch/create/update/delete targets linked to environments",
);

export const TargetError = createErrorSchema("TargetError", ["target_in_use"]);

export const TargetsConfig = z.object({
  maxTargetNameLength: z
    .int()
    .openapi({ description: "The maximum length of a target name", example: 64 }),
  minTargetNameLength: z
    .int()
    .openapi({ description: "The minimum length of a target name", example: 1 }),
  maxTargetsPerProject: z
    .int()
    .openapi({ description: "The maximum amount of targets a project can hold", example: 150 }),
  supportedTargetKinds: z
    .array(TargetKind)
    .openapi({ description: "Target kinds supported by the node", example: ["place"] }),
});
