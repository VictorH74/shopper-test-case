import { Image } from '@/domain/entities/Image';

export interface IImageRepository {
    deleteExpiredImages(): Promise<void>;

    saveImage(image_data: IImageRepository.SaveImageRequest): Promise<Image>;

    getImageById(
        image_uuid: IImageRepository.GetImageByIdRequest
    ): Promise<Image | null>;
}

export namespace IImageRepository {
    export type SaveImageRequest = Image;
    export type GetImageByIdRequest = string;
}
