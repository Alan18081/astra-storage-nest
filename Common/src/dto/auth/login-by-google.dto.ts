import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class LoginByGoogleDto {

  @IsString()
  googleId: string;

}