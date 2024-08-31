import { ImageNotFoundError } from '@/application/errors/ImageNotFoundError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { Image } from '@/domain/entities/Image';

export interface IGetImageById
    extends UseCase<IGetImageById.Request, IGetImageById.Response> {
    execute(image_uuid: IGetImageById.Request): Promise<IGetImageById.Response>;
}

export namespace IGetImageById {
    export type Request = string
    export type Response = Image
    | ImageNotFoundError;
}