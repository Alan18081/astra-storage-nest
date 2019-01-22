import { IsInt } from 'class-validator';

export class RemoveProjectAccountByTokenDto {

    @IsInt()
    id: number;

}