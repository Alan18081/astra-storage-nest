import { IsInt } from 'class-validator';

export class FindAccountDto {

    @IsInt()
    id: number;

}