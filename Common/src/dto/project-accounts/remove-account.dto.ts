import { IsInt } from 'class-validator';

export class RemoveAccountDto {

    @IsInt()
    accountId: number;

}