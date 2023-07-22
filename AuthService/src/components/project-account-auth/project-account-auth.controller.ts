import { Controller } from '@nestjs/common';
import { ProjectAccountAuthService } from './project-account-auth.service';
import { CommunicationCodes, JwtProjectAccountResponse } from 'astra-common';
import { LoginProjectAccountDto } from 'astra-common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProjectAccountAuthController {

  constructor(
    private readonly projectAccountAuthService: ProjectAccountAuthService,
  ) {}

  @MessagePattern({ cmd: CommunicationCodes.LOGIN_PROJECT_ACCOUNT })
  async login(dto: LoginProjectAccountDto): Promise<JwtProjectAccountResponse> {
    return this.projectAccountAuthService.login(dto);
  }

}
