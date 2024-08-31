
export type ImageProps = {
    image_uuid: string;
    buffer_data: Buffer;
    type: string;
};

export class Image {
    public readonly image_uuid: string;

    public readonly buffer_data: Buffer;

    public readonly type: string;

    constructor(props: ImageProps) {
        this.image_uuid = props.image_uuid;
        this.buffer_data = props.buffer_data;
        this.type = props.type;
    }
}