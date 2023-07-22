import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PASSWORD_LENGTH } from '../../config';

export class SetNewPasswordDto {

  @IsString()
  @ApiProperty()
  hash: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  @ApiProperty()
  password: string;

}
