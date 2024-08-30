export type MeasureType = 'WATER' | 'GAS';

export type MeasureProps = {
    measure_uuid: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: string;
    measure_value: number;
    has_confirmed: boolean;
    image_url: string;
};

export class Measure {
    public readonly measure_uuid: string;

    public readonly customer_code: string;

    public readonly measure_datetime: Date;

    public readonly measure_type: string;

    public readonly measure_value: number;

    public readonly has_confirmed: boolean;

    public readonly image_url: string;

    constructor(props: MeasureProps) {
        this.measure_uuid = props.measure_uuid;
        this.customer_code = props.customer_code;
        this.measure_datetime = props.measure_datetime;
        this.measure_type = props.measure_type;
        this.measure_value = props.measure_value;
        this.has_confirmed = props.has_confirmed;
        this.image_url = props.image_url;
    }
}