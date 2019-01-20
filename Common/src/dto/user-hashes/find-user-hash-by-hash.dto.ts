import {IsString} from 'class-validator';

export class FindUserHashByHashDto {

    @IsString()
    hash: string;

}