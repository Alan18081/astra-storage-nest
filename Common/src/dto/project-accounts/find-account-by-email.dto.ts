import { IsEmail } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindAccountByEmailDto extends BaseDto {

    @IsEmail()
    email: string;

}