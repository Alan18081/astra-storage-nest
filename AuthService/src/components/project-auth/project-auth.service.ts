import { Injectable } from '@nestjs/common';
import {
  CommunicationCodes,
  IProject,
  IUser, JwtProjectPayload,
  JwtProjectResponse,
  JwtUserPayload,
  Messages,
  Queues
} from 'astra-common';
import { JwtService } from '@nestjs/jwt';
import { LoginProjectDto } from 'astra-common';
import { createClientOptions } from 'astra-common';
import { ClientProxy, Client, RpcException } from '@nestjs/microservices';
import { isString } from 'util';

@Injectable()
export class ProjectAuthService {

  @Client(createClientOptions(Queues.PROJECTS_SERVICE, process.env.RABBIT_URL))
  private readonly projectsClient: ClientProxy;

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async login({ clientId, clientSecret }: LoginProjectDto): Promise<JwtProjectResponse> {
    const project: IProject = await this.projectsClient
      .send({ cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO }, { clientId, clientSecret })
      .toPromise();

    if (!project) {
      throw new RpcException(Messages.PROJECT_NOT_FOUND);
    }

    const token = this.jwtService.sign({ clientId, clientSecret });
    return {
      token,
    };
  }

  async authByToken(token: string): Promise<IUser | undefined> {
    const payload = this.jwtService.decode(token);
    if (!payload || isString(payload)) {
      throw new RpcException(Messages.INVALID_TOKEN);
    }
    const { clientId, clientSecret } = payload as JwtProjectPayload;

    return this.projectsClient
      .send({ cmd: CommunicationCodes.GET_PROJECT_BY_CLIENT_INFO }, { clientId, clientSecret })
      .toPromise();
  }

}
