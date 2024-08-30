export interface UploadImageRepository {
    uploadImage(reqBody: UploadImageRepository.Request): Promise<UploadImageRepository.Response>;
}

export namespace UploadImageRepository {
    export type Request = any; // TODO: override request any type
    export type Response = any | null; // TODO: override response any type
}