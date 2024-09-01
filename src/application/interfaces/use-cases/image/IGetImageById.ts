import { ImageNotFoundError } from '@/application/errors/ImageNotFoundError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { Image } from '@/domain/entities/Image';

export interface IGetImageById
    extends UseCase<IGetImageById.Request, IGetImageById.Response> {
    execute(paramsObj: IGetImageById.Request): Promise<IGetImageById.Response>;
}

export namespace IGetImageById {
    export type Request = { image_uuid: string; image_type: string };
    export type Response = Image | ImageNotFoundError;
}
