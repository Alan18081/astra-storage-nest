import { IsEmail, IsInt } from 'class-validator';

export class FindProjectAccountByEmailDto {

    @IsEmail()
    email: string;

    @IsInt()
    projectId: number;

}