import express, { Express } from 'express';
import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';
import { setupDbClient } from './database';

export default async (): Promise<Express> => {
  await setupDbClient();
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};