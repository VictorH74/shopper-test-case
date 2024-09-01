import { Image } from "@/domain/entities/Image";

export interface GetImageByIdRepository {
    getImageById(paramsObj: GetImageByIdRepository.Request): Promise<GetImageByIdRepository.Response>;
}

export namespace GetImageByIdRepository {
    export type Request = string;
    export type Response = Image | null;
}