import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {IProjectAccount, JWT_SECRET, JwtProjectAccountPayload, Messages} from '@astra/common';
import {ProjectAccountsService} from '../../project-accounts/project-accounts.service';

@Injectable()
export class JwtProjectAccountStrategy extends PassportStrategy(Strategy, 'jwtProjectAccount') {
    constructor(private readonly projectAccountsService: ProjectAccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('accountToken'),
      secretOrKey: JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: JwtProjectAccountPayload): Promise<IProjectAccount> {
    const projectAccount = await this.projectAccountsService.findOneByEmail(payload.projectId, payload.email, payload.ownerId);
    if (!projectAccount) {
      throw new UnauthorizedException(Messages.INVALID_TOKEN);
    }
    req.projectAccount = projectAccount;
    return projectAccount;
  }
}