import { Type } from 'class-transformer';
import { Address } from './address.entity';
import { PersonType } from './enums/personType';
import {
  IsString,
  IsPhoneNumber,
  IsMobilePhone,
  IsOptional,
  IsInstance,
  IsEmail,
  IsBoolean,
  ValidateNested,
} from 'class-validator';

export class Person {
  public personId?: number;

  @IsString()
  public personType: PersonType;

  @IsString()
  @IsOptional()
  public cnpj?: string;

  @IsString()
  public cpf: string;

  @IsString()
  public name: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  public phone?: string;

  @IsMobilePhone('pt-BR')
  public cellPhone: string;

  @IsEmail()
  public email: string;

  @IsBoolean()
  public termsAccept: boolean;

  @ValidateNested()
  @IsInstance(Address)
  @Type((): Function => Address)
  public address: Address | null;
}
