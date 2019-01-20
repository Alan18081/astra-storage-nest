import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import {Queues, IUser, CommunicationCodes, JwtPayload, JwtResponse, Messages} from '@astra/common';
import {LoginDto, SetNewPasswordDto} from '@astra/common/dto';
import { Client, ClientProxy } from '@nestjs/microservices';
import { createClientOptions } from '@astra/common/helpers';
import {ProjectRequest} from './types/project-request';
import {ProjectAccountRequest} from './types/project-account-request';

@Injectable()
export class AuthService {

  @Client(createClientOptions(Queues.AUTH_SERVICE))
  private readonly authClient: ClientProxy;

  @Client(createClientOptions(Queues.USERS_SERVICE))
  private readonly usersClient: ClientProxy;

  async login(dto: LoginDto): Promise<JwtResponse> {
    return this.authClient.send({ cmd: CommunicationCodes.LOGIN }, dto).toPromise();
  }

  async validateUser(payload: JwtPayload): Promise<IUser | undefined> {
    return this.usersClient.send({ cmd: CommunicationCodes.GET_USER_BY_EMAIL }, { email: payload.email}).toPromise();
  }

  async validateProject(req: ProjectRequest): Promise<boolean> {
    const { projectToken } = req.query;

    if (!projectToken) {
      throw new UnauthorizedException(Messages.PROJECT_TOKEN_NOT_FOUND);
    }

    const project = await this.authClient.send({ cmd: CommunicationCodes.LOGIN_PROJECT }, { token: projectToken }).toPromise();
    if (!project) {
      throw new UnauthorizedException(Messages.PROJECT_NOT_FOUND);
    }

    req.project = project;

    return true;

  }

  async validateProjectAccount(req: ProjectAccountRequest): Promise<boolean> {
      const { accountToken } = req.query;

      if (!accountToken) {
          throw new UnauthorizedException(Messages.ACCOUNT_TOKEN_NOT_FOUND);
      }

      const projectAccount = await this.authClient.send({ cmd: CommunicationCodes.LOGIN_PROJECT_ACCOUNT }, { token: accountToken }).toPromise();
      if (!projectAccount) {
          throw new UnauthorizedException(Messages.ACCOUNT_NOT_FOUND);
      }

      req.projectAccount = projectAccount;

      return true;
  }

  async exchangeToken(refreshToken: string): Promise<JwtResponse> {
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

  async resetPassword(email: string): Promise<void> {
      return this.usersClient
          .send({ cmd: CommunicationCodes.RESET_USER_PASSWORD }, { email })
          .toPromise();
  }

  async setNewPassword(dto: SetNewPasswordDto): Promise<void> {
  }

  async changePassword(): Promise<void> {

  }
}