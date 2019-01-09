import { IsString, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class SetNewPasswordDto {

  @IsString()
  @ApiModelProperty()
  hash: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  @ApiModelProperty()
  password: string;

}