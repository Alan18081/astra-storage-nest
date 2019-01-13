import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {IProject, JwtResponse} from '@astra/common';
import {Project} from '../../helpers/decorators/project.decorator';
import {ApiAuthService} from './api-auth.service';
import {CreateProjectAccountDto, LoginDto} from '@astra/common/dto';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';

@Controller('apiAuth')
@UseGuards(JwtProjectGuard)
export class ApiAuthController {

    constructor(
       private readonly apiAuthService: ApiAuthService,
    ) {}

    @Post('createAccount')
    async createOne(
        @Project() project: IProject,
        @Body() dto: CreateProjectAccountDto
    ): Promise<void> {
        await this.apiAuthService.createOne(project.id, dto);
    }

    @Post('login')
    async login(
        @Project() project: IProject,
        @Body() dto: LoginDto
    ): Promise<JwtResponse> {
        return await this.apiAuthService.login(project.id, dto);
    }
}