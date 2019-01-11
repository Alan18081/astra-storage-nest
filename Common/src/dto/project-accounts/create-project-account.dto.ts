import { IsString, IsEmail, IsInt } from 'class-validator';
import { ValidateProjectDto } from './validate-project.dto';

export class CreateProjectAccountDto extends ValidateProjectDto {

    @IsString()
    login: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    projectId: number;

}