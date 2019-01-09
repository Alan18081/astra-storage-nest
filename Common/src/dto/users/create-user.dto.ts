import {IsEmail, IsString, MinLength} from 'class-validator';
import { PASSWORD_LENGTH } from '../../config';


export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(PASSWORD_LENGTH)
    password: string;

}