import z from "zod";
import { createResponseObject } from "./openapi";

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

export const ErrorResponse = z
  .object({
    error: z.string().openapi({ description: "A machine-readable error code" }),
    error_description: z.string().openapi({
      description: "A human-readable error description",
    }),
  })
  .openapi("Error");

export const InvalidRequestError = createResponseObject(
  "Malformed request body, headers, params or query. Possible error codes: `invalid_request`",
  ErrorResponse,
);

export const NotFoundError = createResponseObject(
  "The requested resource could not be found on this server or the user doesn't have access to it. Possible params: `resource_not_found`",
  ErrorResponse,
);

export const ServerError = createResponseObject(
  "The server couldn't handle your request due to an internal error. Possible error codes: `server_error`",
  ErrorResponse,
);
