import { Container } from 'inversify';
import * as Types from '../../../../src/types';
import { PersonType } from '../../../../src/domain/enums/personType';
import { CreatePersonUseCase } from '../../../../src/usecases/createPerson/createPerson';
import { HttpResponseResult } from '../../../../src/domain/http/httpResponseResult';
import { HttpStatusCode } from '../../../../src/domain/enums/httpStatusCode';

const createInstance = (
  dbConnectionManagerMock?: object,
): CreatePersonUseCase => {
  const container = new Container();

  container
    .bind(Types.DBConnectionManager)
    .toConstantValue(dbConnectionManagerMock);
  container.bind(Types.CreatePersonUseCase).to(CreatePersonUseCase);

  return container.get(Types.CreatePersonUseCase);
};

describe('UseCases', () => {
  describe('Create Person', () => {
    it('Should return an error when person data NOT pass the schema validation', async () => {
      // Given
      const payloadWithoutRequiredField = {
        personType: PersonType.LEGAL_PERSON,
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance();
      const expectedResult = new HttpResponseResult(
        `Invalid Fields`,
        HttpStatusCode.BAD_REQUEST_ERROR,
      );

      // When
      const response = await useCase.execute(payloadWithoutRequiredField);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error when CNPJ is invalid', async () => {
      // Given
      const invalidCnpj = '12345678910123';
      const payload = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: invalidCnpj,
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance();
      const expectedResult = new HttpResponseResult(
        `Invalid CNPJ`,
        HttpStatusCode.BAD_REQUEST_ERROR,
      );

      // When
      const response = await useCase.execute(payload);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error when CPF is invalid', async () => {
      // Given
      const invalidCpf = '123.234.123-70';
      const payload = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '57.240.262/0001-40',
        cpf: invalidCpf,
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance();
      const expectedResult = new HttpResponseResult(
        `Invalid CPF`,
        HttpStatusCode.BAD_REQUEST_ERROR,
      );

      // When
      const response = await useCase.execute(payload);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error when legal person does not have CNPJ', async () => {
      // Given
      const payloadWithoutCnpj = {
        personType: PersonType.LEGAL_PERSON,
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance();
      const expectedResult = new HttpResponseResult(
        `Legal type of person should have CNPJ`,
        HttpStatusCode.BAD_REQUEST_ERROR,
      );

      // When
      const response = await useCase.execute(payloadWithoutCnpj);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error when natural person has a CNPJ', async () => {
      // Given
      const payloadWithCnpj = {
        personType: PersonType.NATURAL_PERSON,
        cnpj: '57.240.262/0001-40',
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance();
      const expectedResult = new HttpResponseResult(
        `Natural Person should not have a CNPJ`,
        HttpStatusCode.BAD_REQUEST_ERROR,
      );

      // When
      const response = await useCase.execute(payloadWithCnpj);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error if user is already created in database', async () => {
      // Given
      const payload = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '57.240.262/0001-40',
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance({
        initialize: () => ({
          manager: {
            find: jest.fn().mockReturnValue([payload]),
          },
        }),
      });
      const expectedResult = new HttpResponseResult(
        `Person Already Exists`,
        HttpStatusCode.CONFLICT,
      );

      // When
      const response = await useCase.execute(payload);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should succesfully create a person', async () => {
      // Given
      const payload = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '57.240.262/0001-40',
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const useCase = createInstance({
        initialize: () => ({
          manager: {
            find: jest.fn().mockReturnValue([]),
            save: jest.fn().mockReturnValue([payload]),
          },
        }),
      });
      const expectedResult = new HttpResponseResult(
        `Created`,
        HttpStatusCode.CREATED,
      );

      // When
      const response = await useCase.execute(payload);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });

    it('Should return an error if something went wrong with database connection', async () => {
      // Given
      const payload = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '57.240.262/0001-40',
        cpf: '825.186.670-75',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };
      const expectedError = 'Erro generico';
      const expectedResult = new HttpResponseResult(
        `Internal Error: ${expectedError}`,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
      const useCase = createInstance({
        initialize: () => {
          throw expectedError;
        },
      });

      // When
      const response = await useCase.execute(payload);

      // Then
      expect(response.message).toBe(expectedResult.message);
      expect(response.statusCode).toBe(expectedResult.statusCode);
    });
  });
});
