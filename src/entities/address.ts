import { IsString, IsOptional } from 'class-validator';

export class Address {
  @IsString()
  public zipCode: string;

  @IsString()
  public street: string;

  @IsString()
  public number: string;

  @IsString()
  @IsOptional()
  public complement?: string;

  @IsString()
  public city: string;

  @IsString()
  public neighborhood: string;

  @IsString()
  public state: string;
}
