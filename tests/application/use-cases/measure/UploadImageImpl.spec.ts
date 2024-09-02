import { UploadImageImpl } from '@application/use-cases/measure/UploadImageImpl';
import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { MeasureRepositoryStub } from '@tests/infra/mocks/measure/MeasureRepositoryStub';
import { makeFakeImage, makeFakeMeasure } from '@tests/domain/mocks/entities';
import { IUploadImage } from '@application/interfaces/use-cases/measure/IUploadImage';
import { ISaveImage } from '@application/interfaces/use-cases/image/ISaveImage';
import { SaveImageStub } from '@tests/application/mocks/measure/usecases';
import { DoubleReportError } from '@application/errors/DoubleReportError';
import {
    getCurrentMonthDate,
    getTwoDaysLaterDateTime,
} from '@main/utils/functions';

type SutTypes = {
    sut: UploadImageImpl;
    saveImageStub: ISaveImage;
    measureRepositoryStub: IMeasureRepository;
};

const getMeasureValueFromImageStub: (
    filePath: string,
    mimeType: string
) => Promise<string> = () => new Promise((res) => res('0000123'));

const makeSut = (): SutTypes => {
    const measureRepositoryStub = new MeasureRepositoryStub();
    const saveImageStub = new SaveImageStub();
    const sut = new UploadImageImpl(
        measureRepositoryStub,
        saveImageStub,
        getMeasureValueFromImageStub
    );

    return {
        sut,
        saveImageStub,
        measureRepositoryStub,
    };
};

describe('UploadImageImpl', () => {
    const fakeMeasure = makeFakeMeasure();

    const requestData: IUploadImage.Request = {
        customer_code: 'xxxxx',
        image: 'data:image/png;base64,...',
        measure_datetime: new Date(0),
        measure_type: 'GAS',
    };

    it('should call IMeasureRepository.checkExistenceOfMeasureByMonth with the correct params', async () => {
        const { sut, measureRepositoryStub } = makeSut();
        const checkExistenceOfMeasureByMonth = jest.spyOn(
            measureRepositoryStub,
            'checkExistenceOfMeasureByMonth'
        );

        await sut.execute(requestData);

        expect(checkExistenceOfMeasureByMonth).toHaveBeenCalledWith(
            requestData.customer_code,
            getCurrentMonthDate(requestData.measure_datetime).toISOString(),
            requestData.measure_datetime.toISOString(),
            requestData.measure_type
        );
    });

    it('should call ISaveImage with the correct image data', async () => {
        const { sut, saveImageStub } = makeSut();
        const saveImage = jest.spyOn(saveImageStub, 'execute');

        await sut.execute(requestData);

        const { image_uuid, ...rest } = makeFakeImage();
        expect(saveImage).toHaveBeenCalledWith({
            ...rest,
            expiration_date: new Date(getTwoDaysLaterDateTime()),
        });
    });

    it('should call IMeasureRepository.saveMeasure with the correct measure data', async () => {
        const { sut, measureRepositoryStub, saveImageStub } = makeSut();
        const saveMeasure = jest.spyOn(measureRepositoryStub, 'saveMeasure');
        jest.spyOn(saveImageStub, 'execute');

        await sut.execute(requestData);

        const { measure_uuid, ...rest } = makeFakeMeasure();

        expect(saveMeasure).toHaveBeenCalledWith(rest);
    });

    it('should return a DoubleReportError if IMeasureRepository.checkExistenceOfMeasureByMonth returns true', async () => {
        const { sut, measureRepositoryStub } = makeSut();
        jest.spyOn(
            measureRepositoryStub,
            'checkExistenceOfMeasureByMonth'
        ).mockReturnValueOnce(Promise.resolve(true));

        const response = await sut.execute(requestData);

        expect(response).toEqual(new DoubleReportError());
    });

    it('should return a success object containing the props: image_url, measure_value and measure_uuid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(requestData);

        const { image_url, measure_value, measure_uuid } = fakeMeasure;
        expect(response).toEqual({
            image_url,
            measure_value,
            measure_uuid,
        });
    });
});
