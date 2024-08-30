import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { ConfirmValueRepository } from '@/application/interfaces/repositories/measure/ConfirmValueRepository';

export class ConfirmValueImpl implements IConfirmValue {
    constructor(
        private readonly ConfirmValueRepository: ConfirmValueRepository, // TODO: remove
        // private readonly GetMeasureByIdRepository: GetMeasureByIdRepository, // TODO: include
        // private readonly UpdateMeasureRepository: UpdateMeasureRepository, // TODO: include
    ) { }

    async execute(reqBody: IConfirmValue.Request): Promise<IConfirmValue.Response> {

        // TODO: Verificar se o 'reqBody.measure_uuid' informado existe. caso não, retornar MeasureNotFoundError()
        // const measure = await GetMeasureByIdRepository.getMeasureByIdRepository(reqBody.measure_uuid)
        // if (!measure) return MeasureNotFoundError();

        // TODO: Verificar se 'has_confirmed' é == true (já foi confirmado). então retornar ConfirmationDuplicateError()
        // if (measure.has_confirmed) return ConfirmationDuplicateError();

        // TODO: Atualizar measure com 'measure_value' = 'reqBody.confirmed_value'
        // await UpdateMeasureRepository.updateMeasureRepository(reqBody.measure_uuid, {...measure, measure_value: reqBody.confirmed_value, has_confirmed: true})

        return { success: true };
    }
}