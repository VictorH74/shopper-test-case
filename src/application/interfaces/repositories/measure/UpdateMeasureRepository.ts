import { Measure } from "@/domain/entities/Measure";

export interface UpdateMeasureRepository {
    updateMeasure(...reqParams: UpdateMeasureRepository.Request): Promise<UpdateMeasureRepository.Response>;
}

export namespace UpdateMeasureRepository {
    export type Request = [measure_id: string, measure_data: Measure];
    export type Response = void;
}