import { IsEmail } from 'class-validator';

export class FindAccountByEmailDto {

    @IsEmail()
    email: string;

}