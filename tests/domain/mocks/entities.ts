import { Image } from '@domain/entities/Image';
import { Measure } from '@domain/entities/Measure';

export const makeFakeImage = (): Image => ({
    buffer_data: new Buffer([]),
    expiration_date: new Date(0),
    image_uuid: 'b6a07fc8-3b26-434d-961b-591303d4de29',
    type: 'png',
});

const { image_uuid, type } = makeFakeImage();

export const makeFakeMeasure = (): Measure => ({
    customer_code: 'xxxxx',
    has_confirmed: false,
    image_url: `https://example.com/images/${image_uuid}.${type}`,
    measure_datetime: new Date(0),
    measure_type: 'GAS',
    measure_uuid: 'c21e67bc-c07c-4b7d-83c4-90a88abd5fd6',
    measure_value: 123,
});
