import { BaseController } from '@/infra/http/controllers/BaseController';
import { GetCustomerMeasureListController } from '@/infra/http/controllers/customer/GetCustomerMeasureListController';
import { makeGetCustomerMeasureList } from '@/main/factories/use-cases/customer/get-customer-measure-list-factory';

export const makeGetCustomerMeasureListController = (): BaseController => {
  const useCase = makeGetCustomerMeasureList();
  return new GetCustomerMeasureListController(useCase);
};