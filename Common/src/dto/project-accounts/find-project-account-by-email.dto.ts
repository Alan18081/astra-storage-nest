import { IsEmail } from 'class-validator';
import { ValidateProjectDto } from './validate-project.dto';

export class FindProjectAccountByEmailDto extends ValidateProjectDto {

    @IsEmail()
    email: string;

}