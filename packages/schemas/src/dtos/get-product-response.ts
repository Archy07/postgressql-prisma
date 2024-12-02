// import { Product } from '../models/product';
// import { GenericResponse } from './generic-response';
// export type GetProductResponse = GenericResponse<Product | null>;

import { z } from 'zod';
import { Product } from '../models/product';

export const GetProductResponse = z.object({ status: z.enum(['success', 'error', 'pending']), data: z.nullable(Product) });
export type GetProductResponse = z.infer<typeof GetProductResponse>;