export interface GetCustomerMeasureListRepository {
    getCustomerMeasureList(reqBody: GetCustomerMeasureListRepository.Request): Promise<GetCustomerMeasureListRepository.Response>;
}

export namespace GetCustomerMeasureListRepository {
    export type Request = any; // TODO: implement response data
    export type Response = any | null; // TODO: override response any type
}