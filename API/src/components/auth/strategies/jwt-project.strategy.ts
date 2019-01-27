import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { IProject, JWT_SECRET, JwtProjectPayload, Messages } from '@astra/common';
import {ProjectsService} from '../../projects/projects.service';

@Injectable()
export class JwtProjectStrategy extends PassportStrategy(Strategy, 'jwtProject') {
  constructor(private readonly projectsService: ProjectsService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('projectToken'),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtProjectPayload): Promise<IProject> {
    const project = await this.projectsService.findOneByClientInfo(payload.clientId, payload.clientSecret);
    if (!project) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    req.project = project;
    return project;
  }
}