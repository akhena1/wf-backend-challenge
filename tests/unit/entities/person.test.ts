import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Address } from '../../../src/entities/address';
import { Person } from '../../../src/entities/person';
import { PersonType } from '../../../src/entities/enums/personType';

const mockAddress: Address = {
  zipCode: '76963-732',
  street: 'Avenida Cuiabá',
  number: '387',
  complement: 'Ao lado do mercado',
  city: 'Cacoal',
  neighborhood: 'Centro',
  state: 'RO',
};

describe('Entities', () => {
  describe('Person', () => {
    it('Should have all Person properties when instance of Person Entity is created', () => {
      // Given
      const obj: Person = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49445044000114',
        cpf: '20095954082',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        address: mockAddress,
      };

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance).toBeInstanceOf(Person);
      expect(instance).toEqual(obj);
    });

    it('Should clean special characters of CPF field when instance of Person Entity is created', () => {
      // Given
      const obj: Person = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49445044000114',
        cpf: '200.959.540-82',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        address: mockAddress,
      };

      const expectCpfResponse = obj.cpf.replace(/[^0-9]/g, '').trim();

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance.cpf).toEqual(expectCpfResponse);
    });

    it('Should clean special characters of CNPJ field when instance of Person Entity is created', () => {
      // Given
      const address: Address = {
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };

      const obj: Person = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49.445.044/0001-14',
        cpf: '20095954082',
        name: 'Kauê Tiago Davi Rezende',
        phone: '(69) 2847-9557',
        cellPhone: '1114721459',
        email: 'kaue.tiago.rezende@nextel.com.br',
        termsAccept: true,
        address,
      };

      const expectCnpjResponse = obj.cnpj?.replace(/[^0-9]/g, '').trim();

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance.cnpj).toEqual(expectCnpjResponse);
    });
  });
});
