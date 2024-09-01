import { HttpResponseError } from './HttpResponseError';

export type HttpResponse<T = any> = {
    statusCode: number;
    body?: T | HttpResponseError;
};
