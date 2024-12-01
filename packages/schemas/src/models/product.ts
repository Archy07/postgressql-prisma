import { z } from 'zod';
export const Product = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  price: z.number(),
});
export type Product = z.infer<typeof Product>;