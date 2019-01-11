import { IsInt } from 'class-validator';

export class RemoveProjectAccountDto {

    @IsInt()
    accountId: number;

}