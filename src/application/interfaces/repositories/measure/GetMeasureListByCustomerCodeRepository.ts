import { Measure, MeasureType } from "@/domain/entities/Measure";

export interface GetMeasureListByCustomerCodeRepository {
    getMeasureListByCustomerCode(...reqParams: GetMeasureListByCustomerCodeRepository.Request): Promise<GetMeasureListByCustomerCodeRepository.Response>;
}

export namespace GetMeasureListByCustomerCodeRepository {
    export type Request = [customerCode: string, measure_type?: MeasureType];
    export type Response = Measure[];
}