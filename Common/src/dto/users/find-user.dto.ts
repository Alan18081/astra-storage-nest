import {IsInt} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindUserDto {

    @IsInt()
    @ApiModelProperty()
    id: number;

}