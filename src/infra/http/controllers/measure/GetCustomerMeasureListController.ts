import { IGetCustomerMeasureList } from '@application/interfaces/use-cases/measure/IGetCustomerMeasureList';
import { BaseController } from '@infra/http/controllers/BaseController';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { HttpResponse } from '@infra/http/interfaces/HttpResponse';
import { notFound, ok } from '@infra/http/helpers/http';
import { CustomerNotFoundError } from '@application/errors/CustomerNotFoundError';
import { MeasuresNotFoundError } from '@application/errors/MeasuresNotFoundError';

export class GetCustomerMeasureListController extends BaseController {
    constructor(
        private readonly getCustomerMeasureList: IGetCustomerMeasureList
    ) {
        super();
    }

    async execute(
        httpRequest: GetCustomerMeasureListController.Request
    ): Promise<GetCustomerMeasureListController.Response> {
        const { params, query } = httpRequest;

        const dataOrError = await this.getCustomerMeasureList.execute({
            customerCode: params!.customerCode,
            measure_type: query?.measure_type,
        });

        if (dataOrError instanceof MeasuresNotFoundError) {
            return notFound(dataOrError);
        }

        if (dataOrError instanceof CustomerNotFoundError) {
            return notFound(dataOrError);
        }

        return ok(dataOrError);
    }
}

export namespace GetCustomerMeasureListController {
    export type Request = HttpRequest<
        undefined,
        { customerCode: string },
        undefined,
        { measure_type?: 'WATER' | 'GAS' }
    >;
    export type Response = HttpResponse<IGetCustomerMeasureList.Response>;
}
