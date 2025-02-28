import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Neil Taggart'),
    image: z.object({
      url: z.string().optional(),
      alt: z.string().optional()
    }).optional(),
    tags: z.array(z.string()).default([])
  })
});

export const collections = {
  blog
};
