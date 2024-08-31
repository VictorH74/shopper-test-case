import { IGetImageById } from "@/application/interfaces/use-cases/image/IGetImageById";
import { BaseController } from "../BaseController";
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import { ImageNotFoundError } from "@/application/errors/ImageNotFoundError";
import { notFound, ok } from '@/infra/http/helpers/http';
import { HttpBufferResponse } from '@/infra/http/interfaces/HttpBufferResponse';

export class GetImageByIdController extends BaseController {
    constructor(
        private readonly GetImageById: IGetImageById,
    ) {
        super();
    }

    async execute(
        httpRequest: GetImageByIdController.Request,
    ): Promise<GetImageByIdController.Response> {
        const { image_uuid } = httpRequest.params!

        const responseData = await this.GetImageById.execute(image_uuid)

        if (responseData instanceof ImageNotFoundError) {
            return notFound(responseData);
        }

        const { buffer_data, type } = responseData

        return ok({ buffer: buffer_data, type })
    }
}

export namespace GetImageByIdController {
    export type Request = HttpRequest<undefined, { image_uuid: string }>;
    export type Response = HttpResponse<HttpBufferResponse>;
}