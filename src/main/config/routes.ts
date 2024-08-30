import { Express, Router } from 'express';
import measureRoutes from '@/main/routes/measure-routes';
import customerRoutes from '@/main/routes/customer-routes';
import testRoutes from '@/main/routes/test-routes';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  measureRoutes(router);
  customerRoutes(router);
  testRoutes(router);
};