import { z } from 'zod';
export const ProductQuerySchema = z.object({
  id: z.coerce.number(),
});
export type ProductQuery = z.infer<typeof ProductQuerySchema>;