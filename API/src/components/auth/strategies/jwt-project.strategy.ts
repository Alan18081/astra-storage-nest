import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Messages} from '../../../helpers/enums/messages.enum';
import { IProject, IUser, JWT_SECRET, JwtProjectPayload } from '@astra/common';

@Injectable()
export class JwtProjectStrategy extends PassportStrategy(Strategy, 'jwt-project') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: JwtProjectPayload): Promise<IProject> {
    const project = await this.authService.validateProject(payload);
    if (!project) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    return project;
  }
}