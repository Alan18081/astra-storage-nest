import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectAccountAuthController } from './project-account-auth.controller';
import { ProjectAccountAuthService } from './project-account-auth.service';
import { JWT_EXPIRES, JWT_SECRET } from '@astra/common';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
    CoreModule,
  ],
  controllers: [ProjectAccountAuthController],
  providers: [ProjectAccountAuthService],
})
export class ProjectAccountAuthModule {}
