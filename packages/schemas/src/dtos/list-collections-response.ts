import { z } from 'zod';
import { Collection } from '../models/collection';

export const ListCollectionsResponse = z.object({ status: z.enum(['success', 'error', 'pending']), data: z.array(Collection) });
export type ListCollectionsResponse = z.infer<typeof ListCollectionsResponse>;