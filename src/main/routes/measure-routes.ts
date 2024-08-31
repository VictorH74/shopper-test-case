import { Router } from 'express';
import { expressJsonRouteAdapter } from '@/main/adapters/express-route-adapter';
import { makeUploadImageController } from '@/main/factories/controllers/measure/upload-image/controller-factory';
import { makeConfirmValueController } from '@/main/factories/controllers/measure/confirm-value/controller-factory';
import { validate } from '../middlewares/validate';
import { uploadImageDataSchema } from '@/infra/http/validations/measure/upload-image-validation';
import { confirmValueDataSchema } from '@/infra/http/validations/measure/confirm-value-validation';
import { getCustomerMeasureListDataSchema } from '@/infra/http/validations/measure/get-customer-measure-list-validation';
import { makeGetCustomerMeasureListController } from '../factories/controllers/measure/get-customer-measure-list/controller-factory';

export default function measureRoutes(router: Router) {
  router.get('/:customerCode/list', validate(getCustomerMeasureListDataSchema, 'INVALID_TYPE'), expressJsonRouteAdapter(makeGetCustomerMeasureListController()))
  router.post('/upload', validate(uploadImageDataSchema, 'INVALID_DATA'), expressJsonRouteAdapter(makeUploadImageController()));
  router.patch('/confirm', validate(confirmValueDataSchema, 'INVALID_DATA'), expressJsonRouteAdapter(makeConfirmValueController()));
}