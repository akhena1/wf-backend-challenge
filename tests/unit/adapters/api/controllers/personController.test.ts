import 'reflect-metadata';
import { PersonController } from '../../../../../src/adapters/api/controllers/person/personController';
import { Container } from 'inversify';
import * as Types from '../../../../../src/types';
import httpMocks from 'node-mocks-http';
import { HttpResponseResult } from '../../../../../src/domain/http/httpResponseResult';
import { Logger } from '../../../../../src/adapters/logger/logger';

const createInstance = (
  useCaseMock?: CallableFunction | object,
): PersonController => {
  const container = new Container();

  container.bind(Types.CreatePersonUseCase).toConstantValue(useCaseMock);
  container.bind(Types.Logger).to(Logger);
  container.bind(Types.PersonController).to(PersonController);

  return container.get(Types.PersonController);
};

describe('Adapters', () => {
  describe('Api Controllers', () => {
    describe('Person Controller', () => {
      describe('POST /create', () => {
        it('Should return with useCase statusCode when its called', async () => {
          // Given
          const expectedResult: HttpResponseResult = {
            statusCode: 201,
            message: 'Created',
          };
          const controller = createInstance({
            execute: jest.fn().mockReturnValue(expectedResult),
          });

          const req = httpMocks.createRequest();
          const res = httpMocks.createResponse();

          // When
          const result = await controller.createPerson(req, res);

          // Then
          expect(result.statusCode).toBe(expectedResult.statusCode);
        });
      });
    });
  });
});
