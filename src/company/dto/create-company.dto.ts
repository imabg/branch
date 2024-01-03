import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsUrl()
  website: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  phone: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.phone !== null)
  countryCode: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
