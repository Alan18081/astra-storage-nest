import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-google-oauth20';
import {GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from '@astra/common/config';
import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
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
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });

      return done(null, newUser);
    } catch (e) {
      done(e, false);
    }
  }

}