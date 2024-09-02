import { BaseController } from '@infra/http/controllers/BaseController';
import { ok } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';

export class ControllerStub extends BaseController {
    async execute(_httpRequest: HttpRequest): Promise<HttpResponse> {
        return ok('any_body');
    }
}
