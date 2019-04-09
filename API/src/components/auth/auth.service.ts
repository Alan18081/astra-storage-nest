import {Injectable} from '@nestjs/common';
import {
    Queues,
    CommunicationCodes,
    JwtUserResponse,
    JwtProjectResponse, JwtProjectAccountResponse,
} from '@astra/common';
import { LoginDto, LoginProjectDto } from '@astra/common/dto';
import { Client, ClientProxy } from '@nestjs/microservices';
import { createClientOptions } from '@astra/common/helpers';

@Injectable()
export class AuthService {

  @Client(createClientOptions(Queues.AUTH_SERVICE))
  private readonly authClient: ClientProxy;

  async login(dto: LoginDto): Promise<JwtUserResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN }, dto).toPromise();
  }

  async loginByGoogle(googleId: string): Promise<JwtUserResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN_BY_GOOGLE }, { googleId }).toPromise();
  }

  async loginProject(dto: LoginProjectDto): Promise<JwtProjectResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN_PROJECT }, dto).toPromise();
  }

  async loginProjectAccount(projectId: number, userId: number, dto: LoginDto): Promise<JwtProjectAccountResponse> {
      return this.authClient
        .send({ cmd: CommunicationCodes.LOGIN_PROJECT_ACCOUNT }, { ...dto, projectId, userId })
        .toPromise();
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