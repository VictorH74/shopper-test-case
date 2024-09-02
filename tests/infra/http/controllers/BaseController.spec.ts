import { serverError } from '@infra/http/helpers/http';
import { HttpRequest } from '@infra/http/interfaces/HttpRequest';
import { ControllerStub } from '@tests/infra/mocks/controllers';

type SutTypes = {
    sut: ControllerStub;
};

const makeSut = (): SutTypes => {
    const sut = new ControllerStub();
    return {
        sut,
    };
};

const makeFakeHttpRequest = (): HttpRequest => ({
    body: { any_field: 'any_value' },
});

describe('BaseController', () => {
    it('should call the execute method with correct params', async () => {
        const { sut } = makeSut();
        const executeSpy = jest.spyOn(sut, 'execute');
        const httpRequest = makeFakeHttpRequest();
        await sut.handle(httpRequest);
        expect(executeSpy).toHaveBeenCalledWith(httpRequest);
    });

    it('should return the same response as the execute method', async () => {
        const { sut } = makeSut();
        const executeHttpResponse = await sut.execute({});
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(executeHttpResponse);
    });

    it('should return 500 if the execute method throws', async () => {
        const { sut } = makeSut();
        jest.spyOn(sut, 'execute').mockImplementationOnce(async () => {
            throw new Error('any_error');
        });
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(serverError(new Error('any_error')));
    });
});
