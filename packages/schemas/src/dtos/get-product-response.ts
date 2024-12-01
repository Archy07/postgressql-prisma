import { Product } from '../models/product';
import { GenericResponse } from './generic-response';
export type GetProductResponse = GenericResponse<Product | null>;