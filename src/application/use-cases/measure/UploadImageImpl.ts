import { IUploadImage } from '@/application/interfaces/use-cases/measure/IUploadImage';
import { v4 as uuidv4 } from 'uuid';
import { DoubleReportError } from '@/application/errors/DoubleReportError';
import fs from 'fs'
import { getMeasureValueFromImage } from '@/main/lib/gemini-ia';
import { MeasureProps } from '@/domain/entities/Measure';
import { MeasureRepository } from '@/infra/db/postgres/MeasureRepository';
import { ServerError } from '@/infra/http/errors/ServerError';

function validateString(input: string): boolean {
  const pattern = /^[0-9]+/;
  return pattern.test(input);
}

function extractNumber(input: string): number {
  if (!validateString(input)) {
    console.error('Erro ao extratir valor inteiro da leitura: String não segue o padrão definido "**{measureValue}**"')
    console.error('input value: ', input)
    throw new Error();
  }

  return Number(input);
}

const base64ToBuffer = (base64Image: string) => {
  const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(imageData, 'base64');
}

const extractBase64Details = (base64Image: string) => {
  const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)![1];
  const extension = mimeType.split('/')[1]; // e.g., 'jpeg', 'png', etc.
  return ({
    mimeType,
    extension
  })
}

const getCurrentMonthDate = (measure_datetime: Date) => {
  const reqMeasureDate = new Date(measure_datetime)
  const currentMonthDate = new Date(0)
  currentMonthDate.setFullYear(reqMeasureDate.getFullYear())
  currentMonthDate.setMonth(reqMeasureDate.getMonth())

  return currentMonthDate;
}

export class UploadImageImpl implements IUploadImage {
  constructor(
    private readonly MeasureRepository: MeasureRepository,
  ) { }

  async execute(reqBody: IUploadImage.Request): Promise<IUploadImage.Response> {
    const reqMeasureDate = new Date(reqBody.measure_datetime)
    const currentMonthDate = getCurrentMonthDate(reqMeasureDate)

    const has_measure = await this.MeasureRepository.checkExistenceOfMeasureByMonth(reqBody.customer_code, reqMeasureDate.toISOString(), currentMonthDate.toISOString(), reqBody.measure_type)
    if (has_measure) {
      return new DoubleReportError();
    }

    const base64Image = reqBody.image;

    const { mimeType, extension } = extractBase64Details(base64Image)
    const filePath = `/tmp/image.${extension}`;

    const buffer = base64ToBuffer(base64Image)

    fs.writeFileSync(filePath, buffer);

    try {
      const iaResponse = await getMeasureValueFromImage(filePath, mimeType)
      const measureValue = extractNumber(iaResponse)
      
      fs.unlinkSync(filePath);

      // TODO: Generate temp measure image url
      // const tempMeasureUrl = await createTempImageUrl(base64Image)
      const tempMeasureUrl = 'path/to/image.png'

      const newMeasure: MeasureProps = {
        customer_code: reqBody.customer_code,
        has_confirmed: false,
        image_url: tempMeasureUrl,
        measure_datetime: reqBody.measure_datetime,
        measure_type: reqBody.measure_type,
        measure_uuid: uuidv4(),
        measure_value: measureValue
      }

      const savedMeasure = await this.MeasureRepository.saveMeasure(newMeasure)

      const { image_url, measure_value, measure_uuid } = savedMeasure

      // temp 
      const res: IUploadImage.Response = { image_url, measure_value, measure_uuid }
      return res;

    } catch (error) {
      console.error(error)
      if (error instanceof Error) return error
      return new ServerError()
    }

  }
}