import { IDeleteExpiredImages } from "@/application/interfaces/use-cases/image/IDeleteExpiredImages";
import { DeleteExpiredImagesImpl } from "@/application/use-cases/image/DeleteExpiredImagesImpl";
import { imageRepositoryInstance } from "@/infra/db/postgres/ImageRepository";

export const makeDeleteExpiredImages = (): IDeleteExpiredImages => {
    return new DeleteExpiredImagesImpl(imageRepositoryInstance);
  };