import { IImageRepository } from "@/application/interfaces/repositories/IImageRepository";
import { IDeleteExpiredImages } from "@/application/interfaces/use-cases/image/IDeleteExpiredImages";

export class DeleteExpiredImagesImpl implements IDeleteExpiredImages {
    constructor(
        private readonly ImageRepository: IImageRepository,
    ) { }

    async execute(): Promise<IDeleteExpiredImages.Response> {
        await this.ImageRepository.deleteExpiredImages()
    }
}