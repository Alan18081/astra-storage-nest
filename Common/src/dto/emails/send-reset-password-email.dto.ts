import {IsEmail, IsString} from 'class-validator';

export class SendResetPasswordEmailDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    hash: string;

}