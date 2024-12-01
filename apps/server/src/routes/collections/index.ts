import express, { Express } from 'express';
import { CollectionsService } from '../../services/collections';
import { ListCollectionsResponse } from '@repo/schemas';
export function collectionsRoute(app: Express): void {
  const collectionsService = new CollectionsService();
  const router = express.Router();
  app.use('/api/collection', router);
  router.get('/', async function (_req, res, next) {
    try {
      const result = await collectionsService.list();
      const response: ListCollectionsResponse = {
        status: 'success',
        data: result,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
}