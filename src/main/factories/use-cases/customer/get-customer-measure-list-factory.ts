import { IGetCustomerMeasureList } from "@/application/interfaces/use-cases/customer/IGetCustomerMeasureList";
import { GetCustomerMeasureListImpl } from "@/application/use-cases/customer/GetCustomerMeasureListImpl";
import { CustomerRepository } from "@/infra/db/prismaOrm/repositories/CustomerRepository";

export const makeGetCustomerMeasureList = (): IGetCustomerMeasureList => {
  const customerRepository = new CustomerRepository();
  return new GetCustomerMeasureListImpl(customerRepository);
};