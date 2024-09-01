export type ErrorCodeType =
    | 'INVALID_DATA'
    | 'DOUBLE_REPORT'
    | 'MEASURE_NOT_FOUND'
    | 'MEASURES_NOT_FOUND'
    | 'CONFIRMATION_DUPLICATE'
    | 'INVALID_TYPE'
    | 'SERVER_ERROR'
    | 'CUSTOMER_NOT_FOUND';

export type HttpResponseError = {
    error_code: string;
    error_description: string;
};
