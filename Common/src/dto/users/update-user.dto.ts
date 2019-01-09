import {IsEmail, IsString, IsInt, IsOptional} from 'class-validator';

export class UpdateUserDto {

    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

}