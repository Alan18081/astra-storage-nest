import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
