import { Transform, Type } from 'class-transformer';
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
  IsEnum,
  Length,
} from 'class-validator';

export class Person {
  public personId?: number;

  @IsEnum(PersonType)
  public personType: PersonType;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.replace(/[^0-9]/g, '').trim())
  @Length(14, 14)
  public cnpj?: string;

  @IsString()
  @Transform(({ value }) => value?.replace(/[^0-9]/g, '').trim())
  @Length(11, 11)
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
