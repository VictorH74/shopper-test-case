import { Express, Router } from 'express';
import measureRoutes from '@/main/routes/measure-routes';

export default (app: Express): void => {
  const router = Router();
  app.use(router);
  measureRoutes(router);
};