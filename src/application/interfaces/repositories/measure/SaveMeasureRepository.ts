import { Measure } from "@/domain/entities/Measure";

export interface SaveMeasureRepository {
    saveMeasure(measure_data: SaveMeasureRepository.Request): Promise<SaveMeasureRepository.Response>;
}

export namespace SaveMeasureRepository {
    export type Request = Measure;
    export type Response = Measure;
}