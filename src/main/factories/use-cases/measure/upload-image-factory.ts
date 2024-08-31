import { IUploadImage } from '@/application/interfaces/use-cases/measure/IUploadImage';
import { UploadImageImpl } from '@/application/use-cases/measure/UploadImageImpl';
import { imageRepositoryInstance } from '@/infra/db/postgres/ImageRepository';
import { measureRepositoryInstance } from '@/infra/db/postgres/MeasureRepository';

export const makeUploadImage = (): IUploadImage => {
  return new UploadImageImpl(measureRepositoryInstance, imageRepositoryInstance);
};