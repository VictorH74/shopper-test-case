import { ISaveImage } from '@/application/interfaces/use-cases/image/ISaveImage';
import { SaveImageImpl } from '@/application/use-cases/image/SaveImageImpl';
import { imageRepositoryInstance } from '@/infra/db/postgres/ImageRepository';

export const makeSaveImage = (): ISaveImage => {
    return new SaveImageImpl(imageRepositoryInstance);
};
