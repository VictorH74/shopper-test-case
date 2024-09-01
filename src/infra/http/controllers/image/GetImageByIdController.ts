import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";
import { BaseController } from "../BaseController";
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import { ImageNotFoundError } from "@/application/errors/ImageNotFoundError";
import { badRequest, notFound, ok } from '@/infra/http/helpers/http';
import { HttpBufferResponse } from '@/infra/http/interfaces/HttpBufferResponse';
import { InvalidImageExtensionError } from "@/application/errors/InvalidImageExtensionError";

export class GetImageByIdController extends BaseController {
    constructor(
        private readonly GetImageById: IGetImageById,
    ) {
        super();
    }

    async execute(
        httpRequest: GetImageByIdController.Request,
    ): Promise<GetImageByIdController.Response> {
        const { image_uuid, extension: image_type } = httpRequest.params!

        const responseData = await this.GetImageById.execute({image_uuid, image_type})

        if (responseData instanceof ImageNotFoundError) {
            return notFound(responseData);
        }

        if (responseData instanceof InvalidImageExtensionError) {
            return badRequest(responseData);
        }

        const { buffer_data, type } = responseData

        return ok({ buffer: buffer_data, type })
    }
}

export namespace GetImageByIdController {
    export type Request = HttpRequest<undefined, { image_uuid: string, extension: string }>;
    export type Response = HttpResponse<HttpBufferResponse>;
}