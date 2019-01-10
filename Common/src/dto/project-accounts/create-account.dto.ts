import { IsString, IsEmail, IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class CreateAccountDto extends BaseDto {

    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    projectId: number;

}