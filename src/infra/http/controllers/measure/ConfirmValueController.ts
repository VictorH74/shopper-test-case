import { IConfirmValue } from '@/application/interfaces/use-cases/measure/IConfirmValue';
import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import { notFound, ok } from '@/infra/http/helpers/http';

export class ConfirmValueController extends BaseController {
  constructor(
    private readonly ConfirmValue: IConfirmValue,
  ) {
    super();
  }

  async execute(
    httpRequest: ConfirmValueController.Request,
  ): Promise<ConfirmValueController.Response> {
    const { id } = httpRequest.params!;
    const responseData = await this.ConfirmValue.execute(id);
    // if (responseData instanceof SomeError) {
    //   return notFound(responseData);
    // }
    return ok(responseData);
  }
}

export namespace ConfirmValueController {
  export type Request = HttpRequest<IConfirmValue.Request>;
  export type Response = HttpResponse<IConfirmValue.Response>;
}