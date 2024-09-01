import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import {
    badRequest,
    conflict,
    notFound,
    ok,
    serverError,
} from '@/infra/http/helpers/http';
import { InvalidDataError } from '@/application/errors/InvalidDataError';
import { ConfirmationDuplicateError } from '@/application/errors/ConfirmationDuplicateError';
import { MeasureNotFoundError } from '@/application/errors/MeasureNotFoundError';

export class ConfirmValueController extends BaseController {
    constructor(private readonly ConfirmValue: IConfirmValue) {
        super();
    }

    async execute(
        httpRequest: ConfirmValueController.Request
    ): Promise<ConfirmValueController.Response> {
        const reqBody = httpRequest.body;

        const responseData = await this.ConfirmValue.execute(reqBody!);

        if (responseData instanceof ConfirmationDuplicateError) {
            return conflict(responseData);
        }

        if (responseData instanceof InvalidDataError) {
            return badRequest(responseData);
        }

        if (responseData instanceof MeasureNotFoundError) {
            return notFound(responseData);
        }

        if (responseData instanceof Error) {
            return serverError(responseData);
        }

        return ok(responseData);
    }
}

export namespace ConfirmValueController {
    export type Request = HttpRequest<IConfirmValue.Request>;
    export type Response = HttpResponse<IConfirmValue.Response>;
}
