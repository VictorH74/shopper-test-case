import { HttpResponse } from '@/infra/http/interfaces/HttpResponse';
import { ServerError } from '@/infra/http/errors/ServerError';
import { HttpResponseError } from '../interfaces/HttpResponseError';

export const ok = <T = any>(body: T): HttpResponse<T> => ({
    statusCode: 200,
    body,
});

const bodyFromError = (error: Error): HttpResponseError => ({ error_code: error.name, error_description: error.message })

export const noContent = (): HttpResponse => ({
    statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse<HttpResponseError> => ({
    statusCode: 400,
    body: bodyFromError(error),
});

export const notFound = (error: Error): HttpResponse<HttpResponseError> => ({
    statusCode: 404,
    body: bodyFromError(error),
});

export const conflict = (error: Error): HttpResponse<HttpResponseError> => ({
    statusCode: 409,
    body: bodyFromError(error),
});

export const serverError = (error?: Error | unknown): HttpResponse<HttpResponseError> => {
    const msg = error instanceof Error ? error.message : undefined;
    return {
        statusCode: 500,
        body: bodyFromError(new ServerError(msg)),
    };
};