import { Module } from '@nestjs/common';
import { ProjectAccountAuthController } from './project-account-auth.controller';
import { ProjectAccountAuthService } from './project-account-auth.service';
import { CoreModule } from '../core/core.module';
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";

@Module({
  imports: [
    CustomJwtModule,
    CoreModule,
  ],
  controllers: [ProjectAccountAuthController],
  providers: [ProjectAccountAuthService],
})
export class ProjectAccountAuthModule {}
