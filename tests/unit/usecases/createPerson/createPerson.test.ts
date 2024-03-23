import { Container } from 'inversify';

const createInstance = () => {
  const container = new Container();
};

describe('UseCases', () => {
  describe('Create Person', () => {
    it('Should return an error when CNPJ is invalid', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error when CPF is invalid', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error when legal person does not have CNPJ', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error when natural person has a CNPJ', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error when person data NOT pass the schema validation', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error if user is already created in database', () => {
      // Given
      // When
      // Then
    });

    it('Should succesfully create a person', () => {
      // Given
      // When
      // Then
    });

    it('Should return an error if something went wrong with database connection', () => {
      // Given
      // When
      // Then
    });
  });
});
