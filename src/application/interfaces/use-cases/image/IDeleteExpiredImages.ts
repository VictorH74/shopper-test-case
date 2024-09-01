import { UseCase } from '@/application/interfaces/use-cases/UseCase';

export interface IDeleteExpiredImages
    extends UseCase<undefined, IDeleteExpiredImages.Response> {
    execute(): Promise<IDeleteExpiredImages.Response>;
}

export namespace IDeleteExpiredImages {
    export type Response = void;
}
