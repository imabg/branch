import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { HeadCount } from '../company.constant';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { Type } from 'class-transformer';

class ProfileDTO {
  @IsNotEmpty()
  @IsString()
  website: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;
}
export class CreateCompanyDto {
  @IsNotEmpty()
  @IsEnum(HeadCount)
  headCount: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProfileDTO)
  profile: ProfileDTO;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}
