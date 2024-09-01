import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { MeasureNotFoundError } from '@/application/errors/MeasureNotFoundError';
import { ConfirmationDuplicateError } from '@/application/errors/ConfirmationDuplicateError';
import { IMeasureRepository } from '@/application/interfaces/repositories/IMeasureRepository';

export class ConfirmValueImpl implements IConfirmValue {
    constructor(private readonly MeasureRepository: IMeasureRepository) {}

    async execute(
        reqBody: IConfirmValue.Request
    ): Promise<IConfirmValue.Response> {
        const measure = await this.MeasureRepository.getMeasureById(
            reqBody.measure_uuid
        );
        if (!measure) return new MeasureNotFoundError();

        if (measure.has_confirmed) return new ConfirmationDuplicateError();

        await this.MeasureRepository.updateMeasure(reqBody.measure_uuid, {
            ...measure,
            measure_value: reqBody.confirmed_value,
            has_confirmed: true,
        });

        return { success: true };
    }
}
