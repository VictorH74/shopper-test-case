import express, { Express } from 'express';
import { setupDbClient } from './database';
import setupRoutes from './routes';
import setupMiddlewares from './middlewares';
import cron from 'node-cron';
import { makeDeleteExpiredImages } from '../factories/use-cases/image/delete-expired-image-factory';


const setupDeleteExpiredImagesCron = () => {
  const DeleteExpiredImages = makeDeleteExpiredImages()

  cron.schedule('*/3 * * * *', async () => {
    await DeleteExpiredImages.execute()
  });
}

export default async function setupApp(): Promise<Express> {
  await setupDbClient();
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  setupDeleteExpiredImagesCron()
  return app;
};