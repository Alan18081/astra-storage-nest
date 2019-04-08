import { Controller } from '@nestjs/common';
import { ProjectAccountAuthService } from './project-account-auth.service';
import { CommunicationCodes, JwtProjectAccountResponse } from '@bit/alan18081.astra-storage.common.dist';
import { LoginProjectAccountDto } from '@bit/alan18081.astra-storage.common.dist/dto';
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
