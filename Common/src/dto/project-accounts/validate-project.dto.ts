import {IsInt} from 'class-validator';

export class ValidateProjectDto {

    @IsInt()
    userId: number;

    @IsInt()
    projectId: number;

}