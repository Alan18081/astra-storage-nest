import { Module } from '@nestjs/common';
import {UserAuthModule} from './components/user-auth/user-auth.module';

@Module({
  imports: [
      UserAuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
