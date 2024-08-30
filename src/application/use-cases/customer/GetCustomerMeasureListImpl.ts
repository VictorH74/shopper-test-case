import { GetCustomerMeasureListRepository } from '@/application/interfaces/repositories/customer/GetCustomerMeasureListRepository';
import { IGetCustomerMeasureList } from '@/application/interfaces/use-cases/customer/IGetCustomerMeasureList';

export class GetCustomerMeasureListImpl implements IGetCustomerMeasureList {
    constructor(
        private readonly getCustomerMeasureListRepository: GetCustomerMeasureListRepository, // TODO: remove
        // private readonly GetMeasureListByCustomerCodeRepository: GetMeasureListByCustomerCodeRepository, // TODO: include
    ) { }

    async execute(reqBody: IGetCustomerMeasureList.Request): Promise<IGetCustomerMeasureList.Response> {

        // TODO: Retornar todos os measures do customer com o code informado (reqBody.customerCode) opcionalmente com o filtro 'reqBody.measure_type'
        // const measures = await GetMeasureListByCustomerCodeRepository.getMeasureListByCustomerCodeRepository(reqBody.customerCode, reqBody.measure_type);

        // temp 
        const res: IGetCustomerMeasureList.Response = {
            customer_code: "",
            measures: []
        }
        return res;
    }
}