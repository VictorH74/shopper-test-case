import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { MeasureType, Measure } from '@domain/entities/Measure';
import { makeFakeMeasure } from '@tests/domain/mocks/entities';

export class MeasureRepositoryStub implements IMeasureRepository {
    checkExistenceOfMeasureByMonth(
        customer_code: string,
        startDatetime: string,
        endDatetime: string,
        measure_type: MeasureType
    ): Promise<boolean> {
        return new Promise((res) => res(false));
    }

    getMeasureById(
        measure_id: IMeasureRepository.GetMeasureByIdRequest
    ): Promise<Measure | null> {
        return new Promise((res) => res(makeFakeMeasure()));
    }

    getMeasureListByCustomerCode(
        customerCode: string,
        measure_type?: MeasureType | undefined
    ): Promise<Measure[]> {
        return new Promise((res) => res([makeFakeMeasure()]));
    }

    saveMeasure(
        measure_data: IMeasureRepository.SaveMeasureRequest
    ): Promise<Measure> {
        return new Promise((res) => res(makeFakeMeasure()));
    }

    updateMeasure(measure_id: string, measure_data: Measure): Promise<void> {
        return new Promise((res) => res());
    }
}
