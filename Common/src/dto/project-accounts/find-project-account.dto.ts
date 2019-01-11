import { IsInt } from 'class-validator';
import { ValidateProjectDto } from './validate-project.dto';

export class FindProjectAccountDto extends ValidateProjectDto {

    @IsInt()
    id: number;

}