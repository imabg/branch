import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { JobLocationType } from '../job.constant';

class SalaryDto {
  @IsString()
  currency: string;

  @IsNumber()
  min: number;

  @IsNumber()
  max: number;
}
export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  requirements: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  benefits: string;

  @IsBoolean()
  @IsOptional()
  isInternal: boolean;

  @IsString()
  @IsOptional()
  jobCode: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Object.keys(JobLocationType))
  locationType: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsMongoId()
  @IsOptional()
  department: string;

  @IsNotEmpty()
  @IsMongoId()
  company: string;

  @IsString()
  @IsOptional()
  industry: string;

  @IsString()
  @IsOptional()
  function: string;

  @IsString()
  @IsNotEmpty()
  employmentType: string;

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  salary: SalaryDto;

  @IsBoolean()
  @IsOptional()
  isArchive: boolean;
}
