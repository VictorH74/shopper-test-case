import { Image } from "@/domain/entities/Image";

export interface GetExpiredImagesRepository {
    getExpiredImages(): Promise<GetExpiredImagesRepository.Response>;
}

export namespace GetExpiredImagesRepository {
    export type Response = Image[];
}