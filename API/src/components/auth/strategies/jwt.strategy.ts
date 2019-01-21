import {Injectable, Req, UnauthorizedException} from '@nestjs/common';
import { Request } from 'express';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import { JwtUserPayload } from '@astra/common';
import {Messages} from '../../../helpers/enums/messages.enum';
import { IUser, JWT_SECRET } from '@astra/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtUserPayload): Promise<IUser> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    return user;
  }
}