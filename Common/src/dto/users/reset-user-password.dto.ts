import { IsEmail } from 'class-validator';

export class ResetUserPasswordDto {

  @IsEmail()
  email: string;

}