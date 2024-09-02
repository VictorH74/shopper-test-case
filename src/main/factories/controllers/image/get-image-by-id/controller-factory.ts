import { BaseController } from '@infra/http/controllers/BaseController';
import { GetImageByIdController } from '@infra/http/controllers/image/GetImageByIdController';
import { makeGetImageById } from '@main/factories/use-cases/image/get-image-by-id-factory';

export const makeGetImageByIdController = (): BaseController => {
    const useCase = makeGetImageById();
    return new GetImageByIdController(useCase);
};
