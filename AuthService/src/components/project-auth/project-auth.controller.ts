import { Controller } from '@nestjs/common';
import { ProjectAuthService } from './project-auth.service';
import { CommunicationCodes, JwtProjectResponse } from '@astra/common';
import { LoginProjectDto } from '@astra/common/dto';
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

}
