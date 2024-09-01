export type HttpRequest<
    TBody = any,
    TParams = any,
    THeaders = any,
    TQuery = any
> = {
    body?: TBody;
    params?: TParams;
    headers?: THeaders;
    query?: TQuery;
};
