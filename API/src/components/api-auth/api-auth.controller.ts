import { Body, Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { IProject, JwtProjectAccountResponse } from '@astra/common';
import {Project} from '../../helpers/decorators/project.decorator';
import {ApiAuthService} from './api-auth.service';
import {CreateProjectAccountDto, LoginDto} from '@astra/common/dto';
import { ApiExceptionFilter } from '../../helpers/filters/api.filter';
import {AuthGuard} from '@nestjs/passport';

@Controller('apiAuth')
@UseFilters(ApiExceptionFilter)
@UseGuards(AuthGuard('jwt-project'))
@ApiUseTags('Api Auth')
export class ApiAuthController {

    constructor(
       private readonly apiAuthService: ApiAuthService,
    ) {}

    @Post('createAccount')
    async createOne(
        @Project() project: IProject,
        @Body() dto: CreateProjectAccountDto,
    ): Promise<void> {
        await this.apiAuthService.createOne(project.id, dto);
    }
}