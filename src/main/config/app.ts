import express, { Express } from 'express';
import { setupDbClient } from './database';
import setupRoutes from './routes';
import setupMiddlewares from './middlewares';
import cron from 'node-cron';
import { imageRepositoryInstance } from '@/infra/db/postgres/ImageRepository';
import { GetExpiredImagesImpl } from '@/application/use-cases/image/GetExpiredImagesImpl';
import { DeleteImageImpl } from '@/application/use-cases/image/DeleteImageImpl';

const setupDeleteExpiredImagesCron = () => {
  const GetExpiredImages = new GetExpiredImagesImpl(imageRepositoryInstance)
  const DeleteImage = new DeleteImageImpl(imageRepositoryInstance)

  cron.schedule('*/3 * * * *', async () => {
    const expiredImages = await GetExpiredImages.execute()

    if (expiredImages.length === 0) {
      return
    }
    const promises: Promise<void>[] = expiredImages.map(i => DeleteImage.execute(i.image_uuid))

    await Promise.all(promises)
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