import { ConfirmValueImpl } from '@/application/use-cases/measure/ConfirmValueImpl';
import { ConfirmValueRepositoryStub } from '@tests/infra/mocks/measure/repositories';
import { makeFakePost } from '@tests/domain/mocks/entities';
import { PostNotFoundError } from '@application/errors/PostNotFoundError';

type SutTypes = {
  sut: ConfirmValueImpl;
  getPostByIdRepositoryStub: ConfirmValueRepositoryStub;
};

const makeSut = (): SutTypes => {
  const getPostByIdRepositoryStub = new ConfirmValueRepositoryStub();
  const sut = new ConfirmValueImpl(getPostByIdRepositoryStub);
  return {
    sut,
    getPostByIdRepositoryStub,
  };
};

describe('ConfirmValueImpl', () => {
  it('should call ConfirmValueImplRepository with correct post id', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    const getPostByIdSpy = jest.spyOn(getPostByIdRepositoryStub, 'getPostById');
    const { id } = makeFakePost();
    await sut.execute(id);
    expect(getPostByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should return a PostNotFoundError if ConfirmValueImplRepository returns null', async () => {
    const { sut, getPostByIdRepositoryStub } = makeSut();
    jest.spyOn(getPostByIdRepositoryStub, 'getPostById').mockReturnValueOnce(Promise.resolve(null));
    const { id } = makeFakePost();
    const response = await sut.execute(id);
    expect(response).toEqual(new PostNotFoundError());
  });

  it('should return a post on success', async () => {
    const { sut } = makeSut();
    const post = makeFakePost();
    const response = await sut.execute(post.id);
    expect(response).toEqual(post);
  });
});