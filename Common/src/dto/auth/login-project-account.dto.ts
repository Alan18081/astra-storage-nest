import { IsEmail, IsInt, IsString, MinLength } from 'class-validator';

export class LoginProjectAccountDto {

  @IsInt()
  projectId: number;

  @IsInt()
  userId: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  password: string;

}