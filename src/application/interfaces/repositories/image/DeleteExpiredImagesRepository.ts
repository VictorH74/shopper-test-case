export interface DeleteExpiredImagesRepository {
    deleteExpiredImages(): Promise<DeleteExpiredImagesRepository.Response>;
}

export namespace DeleteExpiredImagesRepository {
    export type Response = void;
}