import z from "zod";

export const SocialLink = z.object({
  type: z
    .enum(["facebook", "twitter", "youtube", "twitch", "discord", "group", "guilded"])
    .meta({ description: "The target social platform" }),
  title: z.string().meta({ description: "The title of the social link (shown to users)" }),
  url: z.url().meta({ description: "The url of the social link" }),
});
