import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
