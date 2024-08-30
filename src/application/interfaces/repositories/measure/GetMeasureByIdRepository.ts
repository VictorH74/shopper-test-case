import { Measure } from "@/domain/entities/Measure";

export interface GetMeasureByIdRepository {
    getMeasureById(measure_id: GetMeasureByIdRepository.Request): Promise<GetMeasureByIdRepository.Response>;
}

export namespace GetMeasureByIdRepository {
    export type Request = string;
    export type Response = Measure | null;
}