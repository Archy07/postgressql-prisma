import express, { Express } from 'express';
import { VariantsService } from '../../services/variants';
import { ListVariantsResponse } from '@repo/schemas';
export function variantsRoute(app: Express): void {
  const variantsService = new VariantsService();
  const router = express.Router();
  app.use('/api/variant', router);
  router.get('/', async function (_req, res, next) {
    try {
      // Obtener el productId desde el query string, si está presente
      const productId = _req.query.productId ? parseInt(_req.query.productId as string, 10) : undefined;
      const result = await variantsService.list(productId);
      const response: ListVariantsResponse = {
        status: 'success',
        data: result,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
}