import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {Messages} from '../../../helpers/enums/messages.enum';
import { IProject, JWT_SECRET, JwtProjectPayload } from '@astra/common';

@Injectable()
export class JwtProjectStrategy extends PassportStrategy(Strategy, 'jwtProject') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('projectToken'),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtProjectPayload): Promise<IProject> {
    const project = await this.authService.validateProject(payload);
    if (!project) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    req.project = project;
    return project;
  }
}