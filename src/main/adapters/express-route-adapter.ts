import { Request, Response } from 'express';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';
import { BaseController } from '@/infra/http/controllers/BaseController';

export const expressRouteAdapter = (
  controller: BaseController,
) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    headers: req.headers,
    query: req.query,
  };
  const httpResponse = await controller.handle(httpRequest);
  res.status(httpResponse.statusCode).json(httpResponse.body);
};