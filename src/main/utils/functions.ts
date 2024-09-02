export const containsOnlyDigits = (input: string): boolean => {
    const pattern = /^[0-9]+/;
    return pattern.test(input);
};

export const extractNumber = (input: string): number => {
    if (!containsOnlyDigits(input)) {
        console.error('Erro ao extratir valor inteiro da leitura');
        console.error('input value: ', input);
        throw new Error('Erro ao extratir valor da leitura');
    }

    return Number(input);
};

export const base64ToBuffer = (base64Image: string) => {
    const imageData = base64Image.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(imageData, 'base64');
};

export const extractBase64Details = (base64Image: string) => {
    const mimeType = base64Image.match(/^data:(image\/\w+);base64,/)![1];
    const extension = mimeType.split('/')[1]; // e.g., 'jpeg', 'png', etc.
    return {
        mimeType,
        extension,
    };
};

export const getCurrentMonthDate = (measure_datetime: Date) => {
    const reqMeasureDate = new Date(measure_datetime);
    const currentMonthDate = new Date(0);
    currentMonthDate.setFullYear(reqMeasureDate.getFullYear());
    currentMonthDate.setMonth(reqMeasureDate.getMonth());

    return currentMonthDate;
};

export const getTwoDaysLaterDateTime = () => Date.now() + 48 * 60 * 60 * 1000;
