import {IsInt} from 'class-validator';

export class FindProjectDto {

    @IsInt()
    id: number;

    @IsInt()
    userId: number;

}