import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class LoginDto {

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  @ApiProperty()
  password: string;
}
