import {IsEmail, IsString, MinLength} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class LoginDto {

  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  @ApiModelProperty()
  password: string;
}