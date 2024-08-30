import { BaseController } from '@/infra/http/controllers/BaseController';
import { UploadImageController } from '@/infra/http/controllers/measure/UploadImageController';
import { makeUploadImage } from '@/main/factories/use-cases/measure/upload-image-factory';

export const makeUploadImageController = (): BaseController => {
    const useCase = makeUploadImage();
    return new UploadImageController(useCase);
};