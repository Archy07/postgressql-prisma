import { z } from 'zod';
import { Product } from '../models/product';

export const ListProductsResponse = z.object({ status: z.enum(['success', 'error', 'pending']), data: z.array(Product) });

export type ListProductsResponse = z.infer<typeof ListProductsResponse>;