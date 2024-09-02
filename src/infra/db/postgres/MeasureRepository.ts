import { IMeasureRepository } from '@application/interfaces/repositories/IMeasureRepository';
import { Measure } from '@domain/entities/Measure';
import { Client } from '@main/config/database';
import { v4 as uuidv4 } from 'uuid';

export class MeasureRepository implements IMeasureRepository {
    async checkExistenceOfMeasureByMonth(
        ...params: IMeasureRepository.CheckExistenceOfMeasureByMonthRequest
    ) {
        const queryText = `SELECT COUNT(*) > 0 FROM measure 
        WHERE customer_code = $1 
        AND measure_datetime BETWEEN $2 AND $3 
        AND measure_type = $4`;

        const res = await Client.query<Boolean>(queryText, params);

        return Object.values(res.rows[0])[0];
    }

    async getMeasureById(measure_id: IMeasureRepository.GetMeasureByIdRequest) {
        const queryText = `SELECT * FROM measure WHERE measure_uuid = $1`;
        const res = await Client.query<Measure>(queryText, [measure_id]);

        if (res.rowCount == 0) return null;

        return res.rows[0];
    }

    async getMeasureListByCustomerCode(
        ...params: IMeasureRepository.GetMeasureListByCustomerCodeRequest
    ) {
        let queryText = `SELECT measure_uuid, measure_datetime, measure_type, has_confirmed, image_url FROM measure WHERE customer_code = $1 `;

        const measure_type = params[1];
        if (measure_type) queryText += 'AND measure_type = $2';

        const res = await Client.query<Measure>(
            queryText,
            !!measure_type ? params : [params[0]]
        );

        return res.rows;
    }

    async saveMeasure(measure_data: IMeasureRepository.SaveMeasureRequest) {
        const {
            measure_datetime,
            measure_type,
            measure_value,
            has_confirmed,
            customer_code,
            image_url,
        } = measure_data;

        const queryText = `INSERT INTO 
        measure (measure_uuid, measure_datetime, measure_type, measure_value, has_confirmed, image_url, customer_code)
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const res = await Client.query<Measure>(queryText, [
            uuidv4(),
            measure_datetime,
            measure_type,
            measure_value,
            has_confirmed,
            image_url,
            customer_code,
        ]);

        return res.rows[0];
    }

    async updateMeasure(...params: IMeasureRepository.UpdateMeasureRequest) {
        const [measure_uuid, { measure_value, has_confirmed }] = params;

        const queryText = `UPDATE measure SET 
        measure_value = $1, 
        has_confirmed = $2 
        WHERE measure_uuid = $3`;

        await Client.query<Measure>(queryText, [
            measure_value,
            has_confirmed,
            measure_uuid,
        ]);
    }
}

export const measureRepositoryInstance = new MeasureRepository();
