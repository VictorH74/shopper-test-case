import { IUploadImage } from '@application/interfaces/use-cases/measure/IUploadImage';
import { UploadImageImpl } from '@application/use-cases/measure/UploadImageImpl';
import { measureRepositoryInstance } from '@infra/db/postgres/MeasureRepository';
import { makeSaveImage } from '../image/save-image-factory';
import { getMeasureValueFromImage } from '@main/lib/gemini-ia';

export const makeUploadImage = (): IUploadImage => {
    return new UploadImageImpl(
        measureRepositoryInstance,
        makeSaveImage(),
        getMeasureValueFromImage
    );
};
