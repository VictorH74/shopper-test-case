import { UseCase } from '@/application/interfaces/use-cases/UseCase';
import { Image } from '@/domain/entities/Image';

export interface IGetExpiredImages
    extends UseCase<undefined, IGetExpiredImages.Response> {
    execute(): Promise<IGetExpiredImages.Response>;
}

export namespace IGetExpiredImages {
    export type Response = Image[];
}