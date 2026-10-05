import { extendZodWithOpenApi, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);
export const apiRegistry = new OpenAPIRegistry(); // Global OpenAPI registry

export function createResponseObject<const TDesc extends string | undefined>(
  description: TDesc,
  schemas: z.ZodType[],
) {
  return {
    description,
    content: {
      "application/json": {
        schema: schemas.length === 1 ? schemas[0] : z.union(schemas),
      },
    },
  };
}
