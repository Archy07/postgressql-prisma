import { z } from 'zod';
export const Variant = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  productId: z.number()
});
export type Variant = z.infer<typeof Variant>;