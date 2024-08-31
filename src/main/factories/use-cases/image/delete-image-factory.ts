import { IDeleteImage } from "@/application/interfaces/use-cases/image/IDeleteImage";
import { DeleteImageImpl } from "@/application/use-cases/image/DeleteImageImpl";
import { imageRepositoryInstance } from "@/infra/db/postgres/ImageRepository";

export const makeDeleteImage = (): IDeleteImage => {
    return new DeleteImageImpl(imageRepositoryInstance);
  };