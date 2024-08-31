import { Express, Router } from 'express';
import measureRoutes from '@/main/routes/measure-routes';
import imageRoutes from '@/main/routes/image-routes';

export default function setupRoutes(app: Express) {
  const router = Router();
  app.use(router);
  measureRoutes(router);
  imageRoutes(router)
}