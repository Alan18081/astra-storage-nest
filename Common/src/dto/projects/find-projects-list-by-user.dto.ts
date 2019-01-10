import {IsInt} from 'class-validator';

export class FindProjectsListByUserDto {

    @IsInt()
    userId: number;

}