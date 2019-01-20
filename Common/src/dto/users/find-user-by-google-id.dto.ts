import {IsString} from 'class-validator';

export class FindUserByGoogleIdDto {

  @IsString()
  googleId: string;

}