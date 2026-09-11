import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";
import { Project } from "./schemas/project.schema";

export const ProjectTag = createTag("Project", "Routes used to get/create/delete/update projects");

export const ProjectError = createErrorSchema("ProjectError", ["max_projects_exceeded"]);

export const ProjectsConfig = z.object({
  maxUserProjects: z
    .number()
    .openapi({ description: "The maximum number of projects a user can own", example: 10 }),
  minProjectNameLenght: z
    .number()
    .openapi({ description: "The minimum length of a project name", example: 3 }),
  maxProjectNameLenght: z
    .number()
    .openapi({ description: "The maximum length of a project name", example: 64 }),
  supportedProjectTypes: z
    .array(Project.shape.kind)
    .openapi({ description: "All project kinds supported by this node", example: ["game"] }),
});
