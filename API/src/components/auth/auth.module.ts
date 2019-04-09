import {Global, Module} from '@nestjs/common';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {GoogleStrategy} from './strategies/google.strategy';
import { ProjectsModule } from '../projects/projects.module';
import { ProjectAccountsModule } from '../project-accounts/project-accounts.module';
import { JwtProjectStrategy } from './strategies/jwt-project.strategy';
import {JwtProjectAccountStrategy} from './strategies/jwt-project-account.strategy';
import {CoreModule} from "../core/core.module";
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    ProjectsModule,
    ProjectAccountsModule,
    CoreModule,
    CustomJwtModule,
  ],
  exports: [AuthService, CustomJwtModule],
  controllers: [AuthController],
  providers: [
      AuthService,
      JwtStrategy,
      GoogleStrategy,
      JwtProjectStrategy,
      JwtProjectAccountStrategy,
  ],
})
export class AuthModule {}