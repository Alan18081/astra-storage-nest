import { IsInt } from 'class-validator';

export class RemoveUserDto {

    @IsInt()
    id: number;

}