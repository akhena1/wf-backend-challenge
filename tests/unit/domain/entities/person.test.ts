import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { Person } from '../../../../src/domain/entities/person';
import { PersonType } from '../../../../src/domain/enums/personType';

describe('Entities', () => {
  describe('Person', () => {
    it('Should have all Person properties when instance of Person Entity is created', () => {
      // Given
      const obj = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49445044000114',
        cpf: '20095954082',
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

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance).toBeInstanceOf(Person);
      expect(instance).toEqual(obj);
    });

    it('Should clean special characters of CPF field when instance of Person Entity is created', () => {
      // Given
      const obj = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49445044000114',
        cpf: '200.959.540-82',
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

      const expectCpfResponse = obj.cpf.replace(/[^0-9]/g, '').trim();

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance.cpf).toEqual(expectCpfResponse);
    });

    it('Should clean special characters of CNPJ field when instance of Person Entity is created', () => {
      // Given
      const obj = {
        personType: PersonType.LEGAL_PERSON,
        cnpj: '49.445.044/0001-14',
        cpf: '20095954082',
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

      const expectCnpjResponse = obj.cnpj?.replace(/[^0-9]/g, '').trim();

      // When
      const instance = plainToClass(Person, obj);

      // Then
      expect(instance.cnpj).toEqual(expectCnpjResponse);
    });

    describe('validationSchema()', () => {
      it('Should return error when any property NOT pass validation', async () => {
        // Given
        const obj = {
          personType: PersonType.LEGAL_PERSON,
          cnpj: '49.445.044/0001-14',
          cpf: 'WRONG CPF',
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

        // When
        const instance = plainToClass(Person, obj);
        const errors = await instance.validateSchema();

        // Then
        expect(errors.length).toBeGreaterThan(0);
      });

      it('Should return error when any required property is null or undefined', async () => {
        // Given
        const obj = {
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

        // When
        const instance = plainToClass(Person, obj);
        const errors = await instance.validateSchema();

        // Then
        expect(errors.length).toBeGreaterThan(0);
      });
    });
  });
});
