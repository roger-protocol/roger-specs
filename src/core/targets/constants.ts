import { createTag } from "@/shared/tags";
import z from "zod";

export const TargetsTag = createTag(
  "Targets",
  "Routes used to fetch/create/update/delete targets linked to environments",
);

export const TargetsConfig = z.object({
  maxTargetsPerProject: z
    .int()
    .openapi({ description: "The maximum amount of targets a project can hold", example: 150 }),
  minTargetNameLength: z
    .int()
    .openapi({ description: "The minimum length of a target name", example: 1 }),
  maxTargetNameLength: z
    .int()
    .openapi({ description: "The maximum length of a target name", example: 64 }),
  supportedTargetKinds: z
    .array(z.enum(["place"]))
    .openapi({ description: "Target kinds supported by the node", example: ["place"] }),
});
