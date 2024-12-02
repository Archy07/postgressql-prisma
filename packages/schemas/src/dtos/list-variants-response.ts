import { z } from 'zod';
import { Variant } from '../models/variant';

export const ListVariantsResponse = z.object({ status: z.enum(['success', 'error', 'pending']), data: z.array(Variant) });
export type ListVariantsResponse = z.infer<typeof ListVariantsResponse>;