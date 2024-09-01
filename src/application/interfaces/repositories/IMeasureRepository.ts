import { Measure, MeasureType } from '@/domain/entities/Measure';

export interface IMeasureRepository {
    checkExistenceOfMeasureByMonth(
        ...params: IMeasureRepository.CheckExistenceOfMeasureByMonthRequest
    ): Promise<boolean>;

    getMeasureById(
        measure_id: IMeasureRepository.GetMeasureByIdRequest
    ): Promise<Measure | null>;

    getMeasureListByCustomerCode(
        ...params: IMeasureRepository.GetMeasureListByCustomerCodeRequest
    ): Promise<Measure[]>;

    saveMeasure(
        measure_data: IMeasureRepository.SaveMeasureRequest
    ): Promise<Measure>;

    updateMeasure(
        ...params: IMeasureRepository.UpdateMeasureRequest
    ): Promise<void>;
}

export namespace IMeasureRepository {
    export type CheckExistenceOfMeasureByMonthRequest = [
        customer_code: string,
        startDatetime: string,
        endDatetime: string,
        measure_type: MeasureType
    ];
    export type GetMeasureByIdRequest = string;
    export type GetMeasureListByCustomerCodeRequest = [
        customerCode: string,
        measure_type?: MeasureType | undefined
    ];
    export type SaveMeasureRequest = Measure;
    export type UpdateMeasureRequest = [
        measure_id: string,
        measure_data: Measure
    ];
}
