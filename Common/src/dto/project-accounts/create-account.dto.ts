import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateAccountDto {

    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    projectId: number;

}