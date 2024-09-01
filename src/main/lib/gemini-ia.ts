import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

const apiKey =
    process.env.GEMINI_API_KEY ||
    (() => {
        throw new Error('GEMINI_API_KEY not provided!');
    })();

const getFile = async (filePath: string, mimeType: string) => {
    const fileManager = new GoogleAIFileManager(apiKey);

    return fileManager.uploadFile(filePath, {
        mimeType,
        displayName: 'Image',
    });
};

export const getMeasureValueFromImage = async (
    filePath: string,
    mimeType: string
) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            // Choose a Gemini model.
            model: 'gemini-1.5-flash',
        });

        const file = await getFile(filePath, mimeType);

        // Generate content using text and the URI reference for the uploaded file.
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: file.file.mimeType,
                    fileUri: file.file.uri,
                },
            },
            {
                text: 'identify the measurement numbers and retorn just the number in the response text',
            },
        ]);

        // Output the generated text to the console
        return result.response.text();
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        throw new Error('Erro ao processar a imagem. Tente novamente.');
    }
};
