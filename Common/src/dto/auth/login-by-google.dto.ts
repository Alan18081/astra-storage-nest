import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class LoginByGoogleDto {

  @IsString()
  googleId: string;

}
