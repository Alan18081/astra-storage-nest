import { Controller } from '@nestjs/common';
import { ProjectAuthService } from './project-auth.service';
import { CommunicationCodes, IUser, JwtProjectResponse } from 'astra-common';
import { AuthByTokenDto, LoginProjectDto } from 'astra-common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProjectAuthController {

  constructor(
    private readonly projectAuthService: ProjectAuthService,
  ) {}

  @MessagePattern({ cmd: CommunicationCodes.LOGIN_PROJECT })
  async login(dto: LoginProjectDto): Promise<JwtProjectResponse> {
    return this.projectAuthService.login(dto);
  }

  @MessagePattern({ cmd: CommunicationCodes.AUTH_PROJECT_BY_TOKEN })
  async authByToken(dto: AuthByTokenDto): Promise<IUser | undefined> {
    return this.projectAuthService.authByToken(dto.token);
  }

}
