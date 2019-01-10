import {IsInt, IsString} from 'class-validator';

export class CreateRefreshTokenDto {

    @IsInt()
    userId: number;

    @IsString()
    accessToken: string;

}