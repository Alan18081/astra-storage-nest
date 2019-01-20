import {IsInt, IsString, MinLength} from 'class-validator';
import {PASSWORD_LENGTH} from '../../config';

export class ChangePasswordDto {

  @IsInt()
  id: number;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  oldPassword: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  newPassword: string;

}