import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Queues, IUser, CommunicationCodes, LoginDto, JwtPayload, JwtResponse } from '@astra/common';
import { Client, ClientProxy } from '@nestjs/microservices';
import { createClientOptions } from '@astra/common/helpers';

@Injectable()
export class AuthService {

  @Client(createClientOptions(Queues.AUTH_SERVICE))
  client: ClientProxy;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<JwtResponse> {
    return await this.client.send(CommunicationCodes.LOGIN, dto).toPromise();
  }

  async validateUser(payload: JwtPayload): Promise<IUser | undefined> {
    return await this.client.send(CommunicationCodes.GET_USER_BY_EMAIL, { email: payload.email}).toPromise();
  }

  // async exchangeToken(token: string): Promise<JwtResponse> {
  //   const tokenRecord = await this.refreshTokensService.findOneByToken(token);
  //
  //   if (!tokenRecord) {
  //     throw new NotFoundException(Messages.REFRESH_TOKEN_NOT_FOUND);
  //   }
  //
  //   await this.refreshTokensService.deleteOne(tokenRecord.id);
  //
  //   return await this.signIn(tokenRecord.user-auth);
  // }
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
  //
  // async resetPassword(: User): Promise<void> {
  // }
  //
  // setNewPassword(dto: SetNewPasswordDto): Observable<void> {
  //   return this.
  // }
}