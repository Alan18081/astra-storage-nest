import { IsInt } from 'class-validator';

export class FindProjectAccountSdkDto {

    @IsInt()
    id: number;

}