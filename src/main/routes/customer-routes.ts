import { Router } from 'express';
import { expressRouteAdapter } from '@/main/adapters/express-route-adapter';
import { makeGetCustomerMeasureListController } from '@/main/factories/controllers/customer/get-customer-measure-list/controller-factory';
import { validate } from '../middlewares/validate';
import { getCustomerMeasureListDataSchema } from '@/infra/http/validations/custome/get-customer-measure-list-validation';

export default (router: Router): void => {
  router.get('/:customerCode/list', validate(getCustomerMeasureListDataSchema, 'INVALID_TYPE'), expressRouteAdapter(makeGetCustomerMeasureListController()))
};