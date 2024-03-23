import { plainToClass } from 'class-transformer';
import { Address } from '../../../src/domain/entities/address';

describe('Entities', () => {
  describe('Address', () => {
    it('Should have all address properties when instance of Address Entity is created', () => {
      // Given
      const obj: Address = {
        zipCode: '76963-732',
        street: 'Avenida Cuiabá',
        number: '387',
        complement: 'Ao lado do mercado',
        city: 'Cacoal',
        neighborhood: 'Centro',
        state: 'RO',
      };

      // When
      const instance = plainToClass(Address, obj);

      // Then
      expect(instance).toBeInstanceOf(Address);
      expect(instance).toEqual(obj);
    });
  });
});
