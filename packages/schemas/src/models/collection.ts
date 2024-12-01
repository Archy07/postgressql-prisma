import { z } from 'zod';
export const Collection = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  items: z.number(),
});
export type Collection = z.infer<typeof Collection>;