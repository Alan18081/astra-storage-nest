import {IsString} from 'class-validator';

export class VerifyUserHashDto {

    @IsString()
    hash: string;
}