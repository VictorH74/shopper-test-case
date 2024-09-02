import { ConfirmValueImpl } from '@application/use-cases/measure/ConfirmValueImpl';
import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { MeasureRepositoryStub } from '@tests/infra/mocks/measure/MeasureRepositoryStub';
import { makeFakeMeasure } from '@tests/domain/mocks/entities';
import { IConfirmValue } from '@application/interfaces/use-cases/measure/IConfirmValue';
import { MeasureNotFoundError } from '@application/errors/MeasureNotFoundError';
import { ConfirmationDuplicateError } from '@application/errors/ConfirmationDuplicateError';

type SutTypes = {
    sut: ConfirmValueImpl;
    measureRepositoryStub: IMeasureRepository;
};

const makeSut = (): SutTypes => {
    const measureRepositoryStub = new MeasureRepositoryStub();
    const sut = new ConfirmValueImpl(measureRepositoryStub);

    return {
        sut,
        measureRepositoryStub,
    };
};

describe('ConfirmValueImpl', () => {
    const fakeMeasure = makeFakeMeasure();
    const requestData: IConfirmValue.Request = {
        confirmed_value: 123,
        measure_uuid: fakeMeasure.measure_uuid,
    };

    it('should call IMeasureRepository.getMeasureById with the correct measure_uuid', async () => {
        const { sut, measureRepositoryStub } = makeSut();
        const getMeasureById = jest.spyOn(
            measureRepositoryStub,
            'getMeasureById'
        );

        await sut.execute(requestData);

        expect(getMeasureById).toHaveBeenCalledWith(requestData.measure_uuid);
    });

    it("should call IMeasureRepository.updateMeasure with a measure object with prop 'has_confirmed' = true", async () => {
        const { sut, measureRepositoryStub } = makeSut();
        const updateMeasure = jest.spyOn(
            measureRepositoryStub,
            'updateMeasure'
        );

        await sut.execute(requestData);

        expect(updateMeasure).toHaveBeenCalledWith(requestData.measure_uuid, {
            ...fakeMeasure,
            has_confirmed: true,
        });
    });

    it('should return a MeasureNotFoundError if IMeasureRepository.getMeasureById returns null', async () => {
        const { sut, measureRepositoryStub } = makeSut();
        jest.spyOn(measureRepositoryStub, 'getMeasureById').mockReturnValueOnce(
            Promise.resolve(null)
        );

        const response = await sut.execute(requestData);
        expect(response).toEqual(new MeasureNotFoundError());
    });

    it("should return a ConfirmationDuplicateError if the measure object returned by IMeasureRepository.getMeasureById has the prop 'has_confirmed' = true", async () => {
        const { sut, measureRepositoryStub } = makeSut();
        jest.spyOn(measureRepositoryStub, 'getMeasureById').mockReturnValueOnce(
            Promise.resolve({ ...fakeMeasure, has_confirmed: true })
        );

        const response = await sut.execute(requestData);
        expect(response).toEqual(new ConfirmationDuplicateError());
    });

    it('should return a success object', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(requestData);
        expect(response).toEqual({ success: true });
    });
});
