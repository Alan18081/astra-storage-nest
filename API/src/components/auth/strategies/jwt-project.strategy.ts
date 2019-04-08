import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import { IProject, JwtProjectPayload, Messages } from '@bit/alan18081.astra-storage.common.dist';
import {ProjectsService} from '../../projects/projects.service';
import {ConfigService} from '@bit/alan18081.astra-storage.common.dist/services';

@Injectable()
export class JwtProjectStrategy extends PassportStrategy(Strategy, 'jwtProject') {
  constructor(private readonly projectsService: ProjectsService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('projectToken'),
      secretOrKey: configService.get('JWT_SECRET'),
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