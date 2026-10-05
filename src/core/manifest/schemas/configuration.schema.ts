import z from "zod";

export const DeviceType = z.enum(["desktop", "mobile", "tablet", "console", "vr"]);

export const ConfigurationSchema = z.object({
  enableVoiceChat: z
    .boolean()
    .meta({ description: "Whether or not voice chat should be enabled" })
    .optional(),
  allowedDevices: z
    .array(DeviceType)
    .meta({ description: "Restrict game access to specific devices" })
    .optional(),
  privateServerPrice: z
    .int()
    .meta({ description: "The price of private servers. Disabled if unset" })
    .optional(),
});
