import { CustomerNotFoundError } from '@/application/errors/CustomerNotFoundError';
import { MeasuresNotFoundError } from '@/application/errors/MeasuresNotFoundError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { Measure, MeasureType } from '@/domain/entities/Measure';

export interface IGetCustomerMeasureList
    extends UseCase<
        IGetCustomerMeasureList.Request,
        IGetCustomerMeasureList.Response
    > {
    execute(
        reqObj: IGetCustomerMeasureList.Request
    ): Promise<IGetCustomerMeasureList.Response>;
}

export namespace IGetCustomerMeasureList {
    export type Request = {
        customerCode: string;
        measure_type?: MeasureType;
    };
    export type Response =
        | {
              customer_code: string;
              measures: Measure[];
          }
        | CustomerNotFoundError
        | MeasuresNotFoundError;
}
