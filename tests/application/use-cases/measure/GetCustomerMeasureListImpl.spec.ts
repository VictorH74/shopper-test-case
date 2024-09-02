import { GetCustomerMeasureListImpl } from '@application/use-cases/measure/GetCustomerMeasureListImpl';
import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { MeasureRepositoryStub } from '@tests/infra/mocks/measure/MeasureRepositoryStub';
import { makeFakeMeasure } from '@tests/domain/mocks/entities';
import { IGetCustomerMeasureList } from '@application/interfaces/use-cases/measure/IGetCustomerMeasureList';
import { MeasuresNotFoundError } from '@application/errors/MeasuresNotFoundError';

type SutTypes = {
    sut: GetCustomerMeasureListImpl;
    measureRepositoryStub: IMeasureRepository;
};

const makeSut = (): SutTypes => {
    const measureRepositoryStub = new MeasureRepositoryStub();
    const sut = new GetCustomerMeasureListImpl(measureRepositoryStub);

    return {
        sut,
        measureRepositoryStub,
    };
};

describe('GetCustomerMeasureListImpl', () => {
    const fakeMeasure = makeFakeMeasure();

    const requestData: IGetCustomerMeasureList.Request = {
        customerCode: 'xxxxx',
        measure_type: 'GAS',
    };

    it('should call IMeasureRepository.getMeasureListByCustomerCode with the correct measure_uuid', async () => {
        const { sut, measureRepositoryStub } = makeSut();
        const getMeasureListByCustomerCode = jest.spyOn(
            measureRepositoryStub,
            'getMeasureListByCustomerCode'
        );

        await sut.execute(requestData);

        expect(getMeasureListByCustomerCode).toHaveBeenCalledWith(
            requestData.customerCode,
            requestData.measure_type
        );
    });

    it('should return a MeasuresNotFoundError if measure array in response object is empty', async () => {
        const { sut, measureRepositoryStub } = makeSut();

        jest.spyOn(
            measureRepositoryStub,
            'getMeasureListByCustomerCode'
        ).mockReturnValueOnce(Promise.resolve([]));

        const response = await sut.execute(requestData);
        expect(response).toEqual(new MeasuresNotFoundError());
    });

    it('should return a object containing the props: customer_code and measures', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(requestData);
        expect(response).toEqual({
            customer_code: requestData.customerCode,
            measures: [fakeMeasure],
        });
    });
});
