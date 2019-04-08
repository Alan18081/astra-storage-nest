import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { JwtUserPayload, Messages, IUser } from '@bit/alan18081.astra-storage.common.dist';
import {UsersService} from '../../users/users.service';
import {ConfigService} from '@bit/alan18081.astra-storage.common.dist/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      private readonly usersService: UsersService,
      private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtUserPayload): Promise<IUser> {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    return user;
  }
}