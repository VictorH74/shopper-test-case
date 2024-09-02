import { IUploadImage } from '@application/interfaces/use-cases/measure/IUploadImage';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import {
    badRequest,
    conflict,
    ok,
    serverError,
} from '@infra/http/helpers/http';
import { DoubleReportError } from '@application/errors/DoubleReportError';
import { InvalidDataError } from '@application/errors/InvalidDataError';

export class UploadImageController extends BaseController {
    constructor(private readonly UploadImage: IUploadImage) {
        super();
    }

    async execute(
        httpRequest: UploadImageController.Request
    ): Promise<UploadImageController.Response> {
        const reqBody = httpRequest.body;

        const responseData = await this.UploadImage.execute(reqBody!);

        if (responseData instanceof DoubleReportError) {
            return conflict(responseData);
        }

        if (responseData instanceof InvalidDataError) {
            return badRequest(responseData);
        }

        if (responseData instanceof Error) {
            return serverError(responseData);
        }

        return ok(responseData);
    }
}

export namespace UploadImageController {
    export type Request = HttpRequest<IUploadImage.Request>;
    export type Response = HttpResponse<IUploadImage.Response>;
}
