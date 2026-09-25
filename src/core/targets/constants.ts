import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";

export const TargetsTag = createTag(
  "Targets",
  "Routes used to fetch/create/update/delete targets linked to environments",
);

export const TargetError = createErrorSchema("TargetError", ["target_in_use"]);
