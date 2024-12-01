import express, { Express } from 'express';
import serveStatic from 'serve-static';
export function staticRoute(app: Express): void {
  const router = express.Router();
  app.use('/static', router);
  router.use(serveStatic('public'));
}