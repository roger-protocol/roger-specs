import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);
export const apiRegistry = new OpenAPIRegistry(); // Global OpenAPI registry

export function createResponseObject(description: string, schema: z.ZodType) {
  return {
    description,
    content: {
      "application/json": {
        schema,
      },
    },
  };
}
