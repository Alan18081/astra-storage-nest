import {IsInt, IsOptional, IsString} from 'class-validator';

export class CreateProjectDto {

    @IsInt()
    userId: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

}