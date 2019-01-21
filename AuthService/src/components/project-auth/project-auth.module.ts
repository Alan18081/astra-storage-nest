import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProjectAuthController } from './project-auth.controller';
import { ProjectAuthService } from './project-auth.service';
import { JWT_EXPIRES, JWT_SECRET } from '@astra/common';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  controllers: [ProjectAuthController],
  providers: [ProjectAuthService],
})
export class ProjectAuthModule {}
