import express, { Express } from 'express';
export function healthRoute(app: Express): void {
  const router = express.Router();
  app.use('/', router);
  router.get('/', function (_req, res) {
    res.status(200).send('OK');
  });
}