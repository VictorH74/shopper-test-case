import { UseCase } from '@/application/interfaces/use-cases/UseCase';

export interface IDeleteImage
    extends UseCase<IDeleteImage.Request, IDeleteImage.Response> {
    execute(image_uuid: IDeleteImage.Request): Promise<IDeleteImage.Response>;
}

export namespace IDeleteImage {
    export type Request = string
    export type Response = void;
}