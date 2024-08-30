import { Router } from 'express';
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter';
import { makeUploadImageController } from '@/main/factories/controllers/measure/upload-image/controller-factory';
import { makeConfirmValueController } from '@/main/factories/controllers/measure/confirm-value/controller-factory';
import { validate } from '../middlewares/validate';
import { uploadImageDataSchema } from '@/infra/http/validations/measure/upload-image-validation';
import { confirmValueDataSchema } from '@/infra/http/validations/measure/confirm-value-validation';

export default (router: Router): void => {
  router.post('/upload', validate(uploadImageDataSchema, 'INVALID_DATA'), expressRouteAdapter(makeUploadImageController()));
  router.patch('/confirm', validate(confirmValueDataSchema, 'INVALID_DATA'), expressRouteAdapter(makeConfirmValueController()));
};