import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Messages} from '../../../helpers/enums/messages.enum';
import {IProjectAccount, JWT_SECRET, JwtProjectAccountPayload} from '@astra/common';

@Injectable()
export class JwtProjectAccountStrategy extends PassportStrategy(Strategy, 'jwtProjectAccount') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('accountToken'),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtProjectAccountPayload): Promise<IProjectAccount> {
    console.log(payload);
    const projectAccount = await this.authService.validateProjectAccount(payload);
    if (!projectAccount) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    req.projectAccount = projectAccount;
    return projectAccount;
  }
}