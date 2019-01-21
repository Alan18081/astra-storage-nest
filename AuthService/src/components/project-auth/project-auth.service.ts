import { Injectable } from '@nestjs/common';
import { CommunicationCodes, IProject, JwtProjectResponse, Messages, Queues } from '@astra/common';
import { JwtService } from '@nestjs/jwt';
import { LoginProjectDto } from '@astra/common/dto';
import { createClientOptions } from '@astra/common/helpers';
import { ClientProxy, Client, RpcException } from '@nestjs/microservices';

@Injectable()
export class ProjectAuthService {

  @Client(createClientOptions(Queues.PROJECTS_SERVICE))
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

}
