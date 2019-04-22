import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { JwtUserPayload, Messages, IUser } from '@astra/common';
// import {UsersServiceOld} from '../../users/users.service.old';
import {ConfigService} from '@astra/common/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      // private readonly usersService: UsersServiceOld,
      private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtUserPayload): Promise<IUser> {
    // const user = await this.usersService.findOneByEmail(payload.email);
    // if (!user) {
    //   throw new UnauthorizedException(Messages.INVALID_TOKEN);
    // }
    // return user;
      return null;
  }
}