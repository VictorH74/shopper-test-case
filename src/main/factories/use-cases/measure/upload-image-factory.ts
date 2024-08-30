import { IUploadImage } from '@/application/interfaces/use-cases/measure/IUploadImage';
import { UploadImageImpl } from '@/application/use-cases/measure/UploadImageImpl';
import { MeasureRepository } from '@/infra/db/prismaOrm/repositories/MeasureRepository';

export const makeUploadImage = (): IUploadImage => {
  const measureRepository = new MeasureRepository();
  return new UploadImageImpl(measureRepository);
};