import { Request, Response } from 'express';
import { BaseController } from '@/infra/http/controllers/BaseController';
import { HttpRequest } from '@/infra/http/interfaces/HttpRequest';

export const expressRouteAdapter = (
  controller: BaseController,
) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    headers: req.headers,
  };
  const httpResponse = await controller.handle(httpRequest);

  res.status(httpResponse.statusCode).json(httpResponse.body);
};