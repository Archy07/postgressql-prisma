import express, { Express } from 'express';
import { ProductsService } from '../../services/products';
import {
  GetProductResponse,
  ListProductsResponse,
  ProductQuery,
  ProductQuerySchema,
  ProductsQuerySchema,
} from '@repo/schemas';
import { validateQuery } from '../../middlewares/validate-query';
import { validateParams } from '../../middlewares/validate-params';
export function productsRoute(app: Express): void {
  const productsService = new ProductsService();
  const router = express.Router();
  app.use('/api/product', router);
  router.get(
    '/',
    validateQuery(ProductsQuerySchema),
    async function (req, res, next) {
      try {
        const result = await productsService.list(req.query);
        const response: ListProductsResponse = {
          status: 'success',
          data: result,
        };
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );
  router.get(
    '/:id',
    validateParams(ProductQuerySchema),
    async function (req, res, next) {
      try {
        const result = await productsService.get(
          req.params as unknown as ProductQuery,
        );
        const response: GetProductResponse = {
          status: 'success',
          data: result,
        };
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    },
  );
}