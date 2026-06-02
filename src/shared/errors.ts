import z from "zod";

/**
 * Error type that each domain MUST satisfy
 * It ensures an identical and standardized error structure accross API calls
 */
export type ErrorSchema = z.ZodObject<{
  error: z.ZodObject<{
    type: z.ZodLiteral<string>;
    code: z.ZodEnum<Record<string, string>>;
    message: z.ZodString;
  }>;
}>;

/**
 * Factory function to create OpenAPI component Zod schemas for API errors
 * @param id The unique component registration id that will be used to identify this schema inside of the generated OpenAPI file
 * @param codes An array containing all of the error strings that this schema is capable of throwing
 * @returns A zod object satisfying the {@link ErrorSchema} type
 * @example
 * ```ts
 * const AuthError = createErrorSchema("AuthError", [
   "INVALID_SESSION_TOKEN",
   "INVALID_PASSWORD",
   "TOKEN_EXPIRED",
 ]);
 * ```
 */
export function createErrorSchema<
  const TCode extends readonly [string, ...string[]],
  const TId extends string,
>(
  id: TId, // The name that will be used to register that error as an OpenAPI component
  codes: TCode, // All error codes that may be used
) {
  return z
    .object({
      error: z.object({
        type: z.literal(id).openapi({
          description: "The error type that owns the returned error code",
          example: id,
        }),
        code: z
          .enum(codes)
          .openapi({ description: "All application-level error codes", example: codes[0] }),
        message: z.string().openapi({
          description: "A human readable string explaining why this error happened",
          example: `An error happened within the ${id} domain`,
        }),
      }),
    })
    .openapi(id) satisfies ErrorSchema; // Satisfies does not destroy the types infered by this function, only guarantees its structure
}

/**
 * Utility helper to define error schemas in an OpenAPI route definition
 * @param description A summary of what could've gone wrong
 * @param schemas An array of error schemas that can be returned by the route
 * @returns An object formated for the OpenAPI registry response field
 * @example
 * ```ts
 * apiRegistry.registerPath({
 *   path: "/cart",
 *   method: "post",
 *   description: "Add an item to the cart",
 *   responses: {
 *     200: {
 *       description: "Item added successfully!",
 *       content: {
 *         "application/json": {
 *           schema: z.object({ success: z.boolean() }),
 *         },
 *       },
 *     },
 *     401: composeError("The user isn't logged in or the target item doesn't exist", [
 *       AuthError,
 *       CartError,
 *     ]),
 *   },
 * });
 * ```
 */
export function composeError(description: string, schemas: [ErrorSchema, ...ErrorSchema[]]) {
  return {
    description,
    content: {
      "application/json": {
        schema: schemas.length === 1 ? schemas[0] : z.union(schemas),
      },
    },
  };
}
