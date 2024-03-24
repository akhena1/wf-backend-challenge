import { Person } from '../../../src/domain/entities/person';
import { PersonType } from '../../../src/domain/enums/personType';

export const generatePersonFixture = (parameters?: Partial<Person>) => ({
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
  ...parameters,
});
