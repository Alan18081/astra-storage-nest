import {IsEmail, IsString} from 'class-validator';

export class CreateUserByGoogleDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    googleId: string;

}