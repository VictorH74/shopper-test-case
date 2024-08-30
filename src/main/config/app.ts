import express, { Express } from 'express';
import setupMiddlewares from '@/main/config/middlewares';
import setupRoutes from '@/main/config/routes';
import { setupDbClient } from './database';
// import { configDotenv } from 'dotenv'

export default async (): Promise<Express> => {
  // configDotenv()
  await setupDbClient();
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};