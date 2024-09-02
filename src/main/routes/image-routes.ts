import { Router } from 'express';
import { validate } from '@main/middlewares/validate';
import { getImageByIdDataSchema } from '@infra/http/validations/image/get-image-by-id-validation';
import { expressBufferRouteAdapter } from '@main/adapters/express-route-adapter';
import { makeGetImageByIdController } from '../factories/controllers/image/get-image-by-id/controller-factory';

export default function imageRoutes(router: Router) {
    router.get(
        '/images/:image_uuid.:extension',
        validate(getImageByIdDataSchema, 'INVALID_TYPE'),
        expressBufferRouteAdapter(makeGetImageByIdController())
    );
}
