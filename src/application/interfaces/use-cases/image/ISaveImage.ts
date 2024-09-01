import { ImageNotFoundError } from '@/application/errors/ImageNotFoundError';
import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { Image } from '@/domain/entities/Image';

export interface ISaveImage
    extends UseCase<ISaveImage.Request, ISaveImage.Response> {
    execute(image_data: ISaveImage.Request): Promise<ISaveImage.Response>;
}

export namespace ISaveImage {
    export type Request = Image;
    export type Response = Image;
}