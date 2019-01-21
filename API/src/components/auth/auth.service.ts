import {Injectable, UnauthorizedException} from '@nestjs/common';
import {
  Queues,
  IUser,
  CommunicationCodes,
  JwtUserResponse,
  Messages,
  JwtProjectPayload,
  JwtProjectResponse, IProject, JwtProjectAccountPayload, IProjectAccount, JwtUserPayload,
} from '@astra/common';
import { LoginDto, LoginProjectDto, SetNewPasswordDto } from '@astra/common/dto';
import { Client, ClientProxy } from '@nestjs/microservices';
import { createClientOptions } from '@astra/common/helpers';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { ProjectAccountsService } from '../project-accounts/project-accounts.service';

@Injectable()
export class AuthService {

  @Client(createClientOptions(Queues.AUTH_SERVICE))
  private readonly authClient: ClientProxy;

  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
    private readonly projectAccountsService: ProjectAccountsService,
  ) {}

  async login(dto: LoginDto): Promise<JwtUserResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN }, dto).toPromise();
  }

  async loginProject(dto: LoginProjectDto): Promise<JwtProjectResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN_PROJECT }, dto).toPromise();
  }

  async validateUser(payload: JwtUserPayload): Promise<IUser | undefined> {
    return this.usersService.findOneByEmail(payload.email);
  }

  async validateProject({ clientId, clientSecret }: JwtProjectPayload): Promise<IProject | undefined> {
    return this.projectsService.findOneByClientInfo(clientId, clientSecret);
  }

  async validateProjectAccount({ email, projectId }: JwtProjectAccountPayload): Promise<IProjectAccount | undefined> {
    return this.projectAccountsService.findOneByEmail(projectId, email);
  }

  async exchangeToken(refreshToken: string): Promise<JwtUserResponse> {
    return this.authClient
        .send({ cmd: CommunicationCodes.EXCHANGE_TOKEN }, { refreshToken })
        .toPromise();
  }
  //
  // async verifyEmail({ firstName, lastName, email, id }: User): Promise<void> {
  //   const emailHash = await this.userHashesService.createOne(id, HashTypes.EMAIL_VERIFICATION);
  //   const content = this.emailTemplatesService.getTemplate(TemplateTypes.EMAIL_VERIFICATION, {
  //     firstName,
  //     lastName,
  //     url: `http://${HOST}:${PORT}/user-auth/verifyEmail/hash/${emailHash.hash}`,
  //   });
  //   await this.emailSendingService.sendSystemEmail(
  //     email,
  //     this.emailTemplatesService.createSubject(EmailTitles.EMAIL_VERIFICATION),
  //     content,
  //   );
  // }
  //
  // async verifyEmailHash(hash: string): Promise<void> {
  //   const userHash = await this.userHashesService.findOneByHash(hash);
  //   if(!userHash) {
  //     throw new NotFoundException(Messages.EMAIL_VERIFICATION_HASH_NOT_FOUND);
  //   }
  //
  //   await Promise.all([
  //     this.usersService.updateOne(userHash.userId, { emailVerified: true }),
  //     this.userHashesService.deleteOne(userHash.id)
  //   ]);
  // }
}