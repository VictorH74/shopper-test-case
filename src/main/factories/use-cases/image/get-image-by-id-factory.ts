import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";
import { GetImageByIdImpl } from "@/application/use-cases/image/GetImageByIdImpl";
import { imageRepositoryInstance } from "@/infra/db/postgres/ImageRepository";

export const makeGetImageById = (): IGetImageById => {
    return new GetImageByIdImpl(imageRepositoryInstance);
  };