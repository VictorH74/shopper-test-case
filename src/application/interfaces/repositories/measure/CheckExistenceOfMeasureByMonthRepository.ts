import { MeasureType } from "@/domain/entities/Measure";

export interface CheckExistenceOfMeasureByMonthRepository {
    checkExistenceOfMeasureByMonth(...reqParams: CheckExistenceOfMeasureByMonthRepository.Request): Promise<CheckExistenceOfMeasureByMonthRepository.Response>;
}

export namespace CheckExistenceOfMeasureByMonthRepository {
    export type Request = [customer_code: string, startDatetime: string, endDatetime: string, measure_type: MeasureType];
    export type Response = boolean;
}