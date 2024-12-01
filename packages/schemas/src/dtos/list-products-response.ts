import { Product } from '../models/product';
import { GenericResponse } from './generic-response';
export type ListProductsResponse = GenericResponse<Product[]>;