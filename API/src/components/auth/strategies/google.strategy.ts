import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/users.service';
import {ConfigService} from 'astra-common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['openid', 'email'],
    });
  }

  async validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: Function): Promise<any> {
    try {
      const user = await this.usersService.findOneByGoogleId(profile.id);

      if (user) {
        return done(null, user);
      }

      const newUser = await this.usersService.createOneByGoogle({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });

      return done(null, newUser);
    } catch (e) {
      done(e, false);
    }
  }

}
