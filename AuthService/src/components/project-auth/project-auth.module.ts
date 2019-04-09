import { Module } from '@nestjs/common';
import { ProjectAuthController } from './project-auth.controller';
import {CustomJwtModule} from "../custom-jwt/custom-jwt.module";
import {ProjectAuthService} from "./project-auth.service";

@Module({
  imports: [
    CustomJwtModule,
  ],
  controllers: [ProjectAuthController],
  providers: [ProjectAuthService],
})
export class ProjectAuthModule {}
