import { Injectable } from '@nestjs/common';
import {
  CommunicationCodes,
  IProjectAccount,
  JwtProjectAccountResponse,
  Messages,
  Queues,
} from 'astra-common';
import { JwtService } from '@nestjs/jwt';
import { LoginProjectAccountDto } from 'astra-common';
import { createClientOptions } from 'astra-common';
import { ClientProxy, Client, RpcException } from '@nestjs/microservices';
import { HashService } from 'astra-common';

@Injectable()
export class ProjectAccountAuthService {

  @Client(createClientOptions(Queues.PROJECTS_SERVICE, process.env.RABBIT_URL))
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
