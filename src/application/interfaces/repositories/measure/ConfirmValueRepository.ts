export interface ConfirmValueRepository {
    confirmValue(reqBody: ConfirmValueRepository.Request): Promise<ConfirmValueRepository.Response>;
}

export namespace ConfirmValueRepository {
    export type Request = any; // TODO: implement response data
    export type Response = any | null; // TODO: override response any type
}