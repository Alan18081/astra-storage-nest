import {IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginProjectDto {

  @IsString()
  @ApiProperty()
  clientId: string;

  @IsString()
  @ApiProperty()
  clientSecret: string;
}
