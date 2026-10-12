import { createErrorSchema } from "@/shared/errors";
import { createTag } from "@/shared/tags";
import z from "zod";
import { Project } from "./schemas/project.schema";

export const ProjectTag = createTag("Project", "Routes used to get/create/delete/update projects");

export const ProjectError = createErrorSchema("ProjectError", ["max_projects_exceeded"]);

export const ProjectsConfig = z.object({
  maxProjectsPerAccount: z
    .number()
    .openapi({ description: "The maximum number of projects an account can hold", example: 10 }),
  minProjectNameLength: z
    .number()
    .openapi({ description: "The minimum length of a project name", example: 3 }),
  maxProjectNameLength: z
    .number()
    .openapi({ description: "The maximum length of a project name", example: 64 }),
  supportedProjectKinds: z
    .array(Project.shape.kind)
    .openapi({ description: "All project kinds supported by this node", example: ["game"] }),
});
