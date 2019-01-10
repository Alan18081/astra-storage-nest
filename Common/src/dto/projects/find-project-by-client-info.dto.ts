import { IsString } from 'class-validator';

export class FindProjectByClientInfoDto {

    @IsString()
    clientId: string;

    @IsString()
    clientSecret: string;

}