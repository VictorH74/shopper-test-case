import { Image } from "@/domain/entities/Image";

export interface SaveImageRepository {
    saveImage(image_data: SaveImageRepository.Request): Promise<SaveImageRepository.Response>;
}

export namespace SaveImageRepository {
    export type Request = Image;
    export type Response = Image;
}