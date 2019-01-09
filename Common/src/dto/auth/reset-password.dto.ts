import { IsEmail } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class ResetPasswordDto {

  @IsEmail()
  @ApiModelProperty()
  email: string;

}