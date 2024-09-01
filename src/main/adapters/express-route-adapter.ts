import { Request, Response } from 'express';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpBufferResponse } from '@/infra/http/interfaces/HttpBufferResponse';
import { HttpResponseError } from '@/infra/http/interfaces/HttpResponseError';

export const expressJsonRouteAdapter =
    (controller: BaseController) => async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
        };

        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };

export const expressBufferRouteAdapter =
    (controller: BaseController) =>
    async (
        req: Request,
        res: Response<HttpBufferResponse | HttpResponseError>
    ) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            headers: req.headers,
            query: req.query,
        };
        const httpResponse = await controller.handle(httpRequest);

        if (!Object.hasOwn(httpResponse.body, `buffer`)) {
            return res.status(httpResponse.statusCode).json(httpResponse.body);
        }

        res.set('Content-Type', `image/${httpResponse.body.type}`);
        res.status(httpResponse.statusCode).send(httpResponse.body.buffer);
    };
