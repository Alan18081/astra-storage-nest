import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class LoginProjectDto {

  @IsString()
  @ApiModelProperty()
  clientId: string;

  @IsString()
  @ApiModelProperty()
  clientSecret: string;
}