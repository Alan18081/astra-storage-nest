import {IsInt} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {

    @IsInt()
    @ApiProperty()
    id: number;

}
