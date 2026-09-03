import { AuthConfig } from "@/core/auth/constants";
import z from "zod";

/**
 * A registry containing all features configuration schemas used by the feature route to generate the final API response schema.
 *
 * Each entry maps a feature identifier (e.g. "core:auth") to the feature's configuration zod schema.
 * - **Core features:** Each configuration entry must have a default value (e.g. `maxUsernameLength: z.int()...default(32)`)
 * - **Optional features:** Every optional feature configuration schema must be marked as optional using the .optional() method
 *
 * Each configuration entry must be clearly documented using the .openapi() method (refer to the "Writing Schemas" section of the "Writing Routes for OpenAPI" guide)
 *
 * @example
 * export const FeatureRegistry: Record<string, z.ZodType> = {
 *   "core:auth": z.object({
 *     maxUsernameLenght: z
 *       .int()
 *       .positive()
 *       .default(32)
 *       .openapi({ description: "The maximum lenght of a username", example: 32 }),
 *   }),
 *   scheduling: z
 *     .object({
 *       maxScheduledTasks: z
 *         .int()
 *         .positive()
 *         .openapi({
 *           description: "The maximum amount of tasks an account can schedule simultaneously",
 *           example: 3,
 *         }),
 *     })
 *     .optional(),
 * };
 */

export const FeatureRegistry: Record<string, z.ZodType> = {
  "core:auth": AuthConfig,
};
