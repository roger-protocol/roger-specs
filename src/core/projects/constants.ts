import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";

export const ProjectTag = createTag("Project", "Routes used to get/create/delete/update projects");

export const ProjectError = createErrorSchema("ProjectError", ["max_projects_exceeded"]);
