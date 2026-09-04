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

export const ValidationError = createErrorSchema("ValidationError", [
  "invalid_body",
  "invalid_params",
  "invalid_query",
]);

export const NotFoundError = createErrorSchema("NotFoundError", ["resource_not_found"]);

export const ServerError = createErrorSchema("ServerError", [
  "internal_server_error",
  "database_error",
  "external_service_error",
]);
