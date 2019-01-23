import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateProjectAccountDto {

    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    projectId: number;

    @IsInt()
    ownerId: number;

}