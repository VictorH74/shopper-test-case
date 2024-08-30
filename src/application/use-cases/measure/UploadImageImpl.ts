import { IUploadImage } from '@/application/interfaces/use-cases/measure/IUploadImage';
import { UploadImageRepository } from '@/application/interfaces/repositories/measure/UploadImageRepository';
import { v4 as uuidv4 } from 'uuid';
import { DoubleReportError } from '@/application/errors/DoubleReportError';
import fs from 'fs'
import { getMeasureValue } from '@/main/lib/gemini-ia';
import { MeasureProps } from '@/domain/entities/Measure';

function validateString(input: string): boolean {
  const pattern = /^\*\*[0-9]+\*\*$/;
  return pattern.test(input);
}

function extractNumber(input: string): number {
  if (!validateString(input)) {
    console.error('Erro ao extratir valor inteiro da leitura: String não segue o padrão definido "**{measureValue}**"')
    throw new Error();
  }

  // Remove os asteriscos e converte o restante para número
  const numberString = input.slice(2, -2); // Remove os primeiros e últimos dois caracteres (**)
  const numberValue = Number(numberString);

  return numberValue;
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

export class UploadImageImpl implements IUploadImage {
  constructor(
    private readonly uploadImageRepository: UploadImageRepository, // TODO: remove
    // private readonly SaveMeasureRepository: SaveMeasureRepository, // TODO: include
    // private readonly GetExistentMeasureRepository: GetExistentMeasureRepository, // TODO: include
  ) { }

  async execute(reqBody: IUploadImage.Request): Promise<IUploadImage.Response> {
    // TODO: Verificar se já existe uma leitura no mês naquele tipo de leitura.
    const reqMeasureDate = new Date(reqBody.measure_datetime)
    const currentMonthDate = new Date(0)
    currentMonthDate.setFullYear(reqMeasureDate.getFullYear())
    currentMonthDate.setMonth(reqMeasureDate.getMonth())

    // TODO: obter do banco de dados medidas com 'customer_code == reqBody.customer_code' e 'measure_datetime > currentMonthDate.toISOString()' e 'measure_type == reqBody.measure_type'
    // QUERY -> SELECT COUNT(*) FROM measure WHERE customer_code = :reqBody.customer_code AND measure_datetime BETWEEN :currentMonthDate.toISOString() AND reqMeasureDate.toISOString() AND measure_type = :reqBody.measure_type
    // const count = await GetExistentMeasureRepository.getExistentMeasureRepository(reqBody.customer_code, currentMonthDate.toISOString(), reqMeasureDate.toISOString(), reqBody.measure_type)
    const count = 0;
    if (count > 0) {
      return new DoubleReportError();
    }

    const base64Image = reqBody.image;

    const {mimeType, extension} = extractBase64Details(base64Image)
    const filePath = `/tmp/image.${extension}`;

    const buffer = base64ToBuffer(base64Image)

    fs.writeFileSync(filePath, buffer);

    try {
      const iaResponse = await getMeasureValue(filePath, mimeType)
      const measureValue = extractNumber(iaResponse)

      // TODO: Generate temp measure image url
      // const tempMeasureUrl = await createTempImageUrl(base64Image)
      const tempMeasureUrl = ''

      fs.unlinkSync(filePath);

      // TODO: save measure in database
      const newMeasure: MeasureProps = {
        has_confirmed: false,
        image_url: tempMeasureUrl,
        measure_datetime: reqBody.measure_datetime,
        measure_type: reqBody.measure_type,
        measure_uuid: uuidv4(),
        measure_value: measureValue
      }
      // const savedMeasure = await SaveMeasureRepository.saveMeasureRepository(newMeasure)

      const { image_url, measure_value, measure_uuid } = newMeasure

      // temp 
      const res: IUploadImage.Response = { image_url, measure_value, measure_uuid }
      return res;

    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
      return new Error('Erro ao processar a imagem. Tente novamente.')
    }

  }
}