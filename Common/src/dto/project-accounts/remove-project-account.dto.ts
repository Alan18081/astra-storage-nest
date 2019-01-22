import { IsInt } from 'class-validator';

export class RemoveProjectAccountDto {

    @IsInt()
    id: number;

    @IsInt()
    projectId: number;

    @IsInt()
    userId: number;

}