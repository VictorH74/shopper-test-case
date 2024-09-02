import { IGetCustomerMeasureList } from '@application/interfaces/use-cases/measure/IGetCustomerMeasureList';
import { GetCustomerMeasureListImpl } from '@application/use-cases/measure/GetCustomerMeasureListImpl';
import { measureRepositoryInstance } from '@infra/db/postgres/MeasureRepository';

export const makeGetCustomerMeasureList = (): IGetCustomerMeasureList => {
    return new GetCustomerMeasureListImpl(measureRepositoryInstance);
};
