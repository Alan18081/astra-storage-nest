import {IsString} from 'class-validator';

export class ExchangeTokenDto {

  @IsString()
  refreshToken: string;

}