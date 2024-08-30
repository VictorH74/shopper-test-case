import { MeasuresNotFoundError } from '@/application/errors/MeasuresNotFoundError';
import { GetMeasureListByCustomerCodeRepository } from '@/application/interfaces/repositories/measure/GetMeasureListByCustomerCodeRepository';
import { IGetCustomerMeasureList } from '@/application/interfaces/use-cases/measure/IGetCustomerMeasureList';

export class GetCustomerMeasureListImpl implements IGetCustomerMeasureList {
    constructor(
        private readonly GetMeasureListByCustomerCodeRepository: GetMeasureListByCustomerCodeRepository,
    ) { }

    async execute(reqBody: IGetCustomerMeasureList.Request): Promise<IGetCustomerMeasureList.Response> {
        const measures = await this.GetMeasureListByCustomerCodeRepository.getMeasureListByCustomerCode(reqBody.customerCode, reqBody.measure_type);

        if (measures.length == 0) return new MeasuresNotFoundError()

        const res: IGetCustomerMeasureList.Response = {
            customer_code: reqBody.customerCode,
            measures
        }
        return res;
    }
}