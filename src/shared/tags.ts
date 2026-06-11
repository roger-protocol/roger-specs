export const tagRegistry = new Map<string, string>();

/**
 *
 * @param tagName The tag name that will be used in the OpenAPI document
 * @param tagDescription The tag description (what routes it should be put on)
 * @returns The tag name
 * @example
 * ```ts
 * const AuthTag = createTag("Auth", "Auth related endpoints");
 * apiRegistry.registerPath({
 *  method: "get",
 *  path: "/auth/account",
 *  tags: [AuthTag],
 *  responses: { ... },
 * });
 * ```
 */
export function createTag<const T extends string>(tagName: T, tagDescription: string): T {
  if (!(tagName in tagRegistry)) {
    tagRegistry.set(tagName, tagDescription);
  } else {
    console.warn(`[TagRegistry]: Tag ${tagName} is already registered. Registration skipped`);
  }
  return tagName;
}
