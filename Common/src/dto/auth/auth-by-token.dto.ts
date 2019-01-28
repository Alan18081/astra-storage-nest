import { IsString } from 'class-validator';

export class AuthByTokenDto {

  @IsString()
  token: string;

}