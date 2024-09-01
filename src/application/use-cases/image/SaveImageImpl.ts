import { IImageRepository } from "@/application/interfaces/repositories/IImageRepository";
import { ISaveImage } from "@/application/interfaces/use-cases/image/ISaveImage";

export class SaveImageImpl implements ISaveImage {
    constructor(
        private readonly ImageRepository: IImageRepository,
    ) { }

    async execute(image_data: ISaveImage.Request): Promise<ISaveImage.Response> {
        const savedImg = await this.ImageRepository.saveImage(image_data);
        
        return savedImg;
    }
}