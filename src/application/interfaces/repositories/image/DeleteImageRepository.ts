export interface DeleteImageRepository {
    deleteImage(image_uuid: DeleteImageRepository.Request): Promise<DeleteImageRepository.Response>;
}

export namespace DeleteImageRepository {
    export type Request = string;
    export type Response = void;
}