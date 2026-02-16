import { defineCollection, z } from "astro:content";

const ruby = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { ruby };
