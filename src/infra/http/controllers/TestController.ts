import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import { badRequest, notFound, ok } from '@/infra/http/helpers/http';
import { ITestCase } from '@/application/interfaces/use-cases/ITestCase';

// TODO: remove
export class TestController extends BaseController {
    constructor(
        private readonly TestCase: ITestCase,
    ) {
        super();
    }

    async execute(
        httpRequest: TestController.Request,
    ): Promise<TestController.Response> {
        const { params, query } = httpRequest;

        const responseData = await this.TestCase.execute({ paramValue: params!.paramValue, ...query! });
        // if (responseData instanceof SomeError) {
        //   return notFound(responseData);
        // }
        return ok(responseData);
    }
}

export namespace TestController {
    export type Request = HttpRequest<undefined, { paramValue: string; }, undefined, {
        mandatoryPathVariable: Date;
        optionalPathVariable?: string;
    }>;
    export type Response = HttpResponse<ITestCase.Response | Error>;
}