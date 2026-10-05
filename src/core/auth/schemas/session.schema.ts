import z from "zod";
import { SessionId } from "./ids.schema";

export const UserSession = z
  .object({
    id: SessionId,
    ip_address: z.union([z.ipv4(), z.ipv6()]).openapi({
      description: "The last used IP for this session",
      example: "127.0.0.1",
      type: "string",
      format: "ip",
    }),
    is_current: z
      .boolean()
      .openapi({ description: "Indicates if this session is the current requesting session" }),
    country: z
      .string()
      .optional()
      .openapi({ description: "The country where the session was last used", example: "France" }),
    client_name: z.string().openapi({
      description:
        "The user-friendly name of the client who created the session (can be spoofable)",
      example: "Roger CLI (MacOS)",
    }),
    created_at: z.iso.datetime().openapi({
      description: "The ISO timestamp at which the session was created",
      example: "2026-08-22T12:14:03.534Z",
    }),
    last_used_at: z.iso.datetime().openapi({
      description: "The ISO timestamp at which the session was last used",
      example: "2026-08-25T16:50:33.444Z",
    }),
  })
  .openapi("UserSession");
