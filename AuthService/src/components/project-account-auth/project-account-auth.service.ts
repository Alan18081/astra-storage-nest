import { Injectable } from '@nestjs/common';
import {
  CommunicationCodes,
  IProjectAccount,
  JwtProjectAccountResponse,
  Messages,
  Queues,
} from '@bit/alan18081.astra-storage.common.dist';
import { JwtService } from '@nestjs/jwt';
import { LoginProjectAccountDto } from '@bit/alan18081.astra-storage.common.dist/dto';
import { createClientOptions } from '@bit/alan18081.astra-storage.common.dist/helpers';
import { ClientProxy, Client, RpcException } from '@nestjs/microservices';
import { HashService } from '@bit/alan18081.astra-storage.common.dist/services';

@Injectable()
export class ProjectAccountAuthService {

  @Client(createClientOptions(Queues.PROJECTS_SERVICE))
  private readonly projectsClient: ClientProxy;

  constructor(
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  async login({ email, password, projectId, userId }: LoginProjectAccountDto): Promise<JwtProjectAccountResponse> {
    const projectAccount: IProjectAccount = await this.projectsClient
      .send({ cmd: CommunicationCodes.GET_PROJECT_ACCOUNT_BY_EMAIL }, { email, projectId, userId })
      .toPromise();

    if (!projectAccount) {
      throw new RpcException(Messages.USER_NOT_FOUND);
    }

    if (!(await this.hashService.compareHash(password, projectAccount.password))) {
      throw new RpcException(Messages.WRONG_PASSWORD);
    }

    const accessToken = this.jwtService.sign({
      email: projectAccount.email,
      id: projectAccount.id,
      projectId: projectAccount.projectId,
    });
    return {
      accessToken,
    };
  }

}
